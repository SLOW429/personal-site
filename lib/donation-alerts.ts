import { isRecord } from "@/lib/paypal-server";

export type DonationAlert = {
  id: string;
  name: string;
  message?: string;
  amount: string;
  currency: string;
  createdAt: string;
};

export type DonationOrderDetails = {
  name: string;
  message: string;
};

type RedisResponse = {
  result?: unknown;
  error?: string;
};

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;
  return { url: url.replace(/\/+$/, ""), token };
}

async function executeRedis<T>(command: unknown[]) {
  const config = getRedisConfig();
  if (!config) throw new Error("Donation alert storage is not configured.");

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  const result: RedisResponse = await response.json();
  if (!response.ok || result.error) {
    console.error("Donation alert storage request failed", response.status, result.error);
    throw new Error("Donation alert storage request failed.");
  }

  return result.result as T;
}

export function isDonationAlert(value: unknown): value is DonationAlert {
  return isRecord(value)
    && typeof value.id === "string"
    && typeof value.name === "string"
    && (value.message === undefined || typeof value.message === "string")
    && typeof value.amount === "string"
    && typeof value.currency === "string"
    && typeof value.createdAt === "string";
}

export async function saveDonationOrderDetails(orderId: string, details: DonationOrderDetails) {
  await executeRedis([
    "SET",
    `donation:order:${orderId}`,
    JSON.stringify(details),
    "EX",
    "86400",
  ]);
}

export async function getDonationOrderDetails(orderId: string): Promise<DonationOrderDetails | null> {
  const result = await executeRedis<unknown>(["GET", `donation:order:${orderId}`]);
  if (typeof result !== "string") return null;

  try {
    const details: unknown = JSON.parse(result);
    if (!isRecord(details)) return null;
    return {
      name: typeof details.name === "string" ? details.name.slice(0, 80) : "",
      message: typeof details.message === "string" ? details.message.slice(0, 200) : "",
    };
  } catch (error) {
    console.error("Stored donation order details could not be parsed.", error);
    return null;
  }
}

export async function publishDonationAlert(alert: DonationAlert) {
  const script = [
    "if redis.call('SET', KEYS[1], '1', 'NX', 'EX', 2592000) then",
    "  redis.call('LPUSH', KEYS[2], ARGV[1])",
    "  redis.call('LTRIM', KEYS[2], 0, 19)",
    "  return 1",
    "end",
    "return 0",
  ].join("\n");

  return executeRedis<number>([
    "EVAL",
    script,
    "2",
    `donation:event:${alert.id}`,
    "donation:recent",
    JSON.stringify(alert),
  ]);
}

export async function getRecentDonationAlerts() {
  const records = await executeRedis<unknown>(["LRANGE", "donation:recent", "0", "19"]);
  if (!Array.isArray(records)) return [];

  return records.flatMap((record) => {
    if (typeof record !== "string") return [];

    try {
      const parsed: unknown = JSON.parse(record);
      return isDonationAlert(parsed) ? [parsed] : [];
    } catch (error) {
      console.error("Stored donation alert could not be parsed", error);
      return [];
    }
  });
}
