type JsonRecord = Record<string, unknown>;

const liveApi = "https://api-m.paypal.com";
const sandboxApi = "https://api-m.sandbox.paypal.com";

export type PayPalConfig = {
  clientId: string;
  clientSecret: string;
  webhookId: string | null;
  apiBase: string;
};

export function getPayPalConfig(): PayPalConfig | null {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;

  if (!clientId || !clientSecret) return null;

  return {
    clientId,
    clientSecret,
    webhookId: webhookId || null,
    apiBase: process.env.PAYPAL_ENV === "sandbox" ? sandboxApi : liveApi,
  };
}

export function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function getPayPalAccessToken(config: PayPalConfig) {
  const credentials = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");
  const response = await fetch(`${config.apiBase}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  const result: unknown = await response.json();
  if (!response.ok || !isRecord(result) || typeof result.access_token !== "string") {
    console.error("PayPal access token request failed", response.status);
    throw new Error("PayPal authentication failed.");
  }

  return result.access_token;
}

export async function paypalRequest(
  config: PayPalConfig,
  accessToken: string,
  path: string,
  init: RequestInit = {}
): Promise<unknown> {
  const response = await fetch(`${config.apiBase}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  const result: unknown = await response.json();
  if (!response.ok) {
    console.error("PayPal API request failed", { path, status: response.status });
    throw new Error("PayPal payment request failed.");
  }

  return result;
}
