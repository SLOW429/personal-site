import { NextResponse } from "next/server";
import { getPayPalAccessToken, getPayPalConfig, isRecord, paypalRequest } from "@/lib/paypal-server";

export async function POST(request: Request) {
  const config = getPayPalConfig();
  if (!config) {
    return NextResponse.json({ error: "خدمة الدفع غير مكتملة الإعداد." }, { status: 503 });
  }

  const input: unknown = await request.json().catch(() => null);
  if (!isRecord(input)) {
    return NextResponse.json({ error: "بيانات الطلب غير صالحة." }, { status: 400 });
  }

  const amountText = typeof input.amount === "number" || typeof input.amount === "string"
    ? String(input.amount).trim()
    : "";
  const amount = Number(amountText);
  if (!/^\d{1,9}(?:\.\d{1,2})?$/.test(amountText) || !Number.isFinite(amount) || amount < 1) {
    return NextResponse.json({ error: "اكتب مبلغًا صحيحًا، والحد الأدنى 1$ وبحد أقصى منزلتين عشريتين." }, { status: 400 });
  }

  const donorName = typeof input.donorName === "string"
    ? input.donorName.trim().slice(0, 80) || "متبرع مجهول"
    : "متبرع مجهول";

  try {
    const accessToken = await getPayPalAccessToken(config);
    const order = await paypalRequest(config, accessToken, "/v2/checkout/orders", {
      method: "POST",
      headers: { "PayPal-Request-Id": crypto.randomUUID() },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: { currency_code: "USD", value: amount.toFixed(2) },
          custom_id: donorName,
          description: "دعم قناة SLOW429",
        }],
      }),
    });

    if (!isRecord(order) || typeof order.id !== "string") {
      console.error("PayPal order response did not include an order ID.");
      return NextResponse.json({ error: "تعذر إنشاء طلب الدفع." }, { status: 502 });
    }

    return NextResponse.json({ id: order.id }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("PayPal order creation failed.", error);
    return NextResponse.json({ error: "تعذر إنشاء طلب الدفع. حاول مرة أخرى." }, { status: 502 });
  }
}
