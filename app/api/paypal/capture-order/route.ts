import { NextResponse } from "next/server";
import { getPayPalAccessToken, getPayPalConfig, isRecord, paypalRequest } from "@/lib/paypal-server";

export async function POST(request: Request) {
  const config = getPayPalConfig();
  if (!config) {
    return NextResponse.json({ error: "خدمة الدفع غير مكتملة الإعداد." }, { status: 503 });
  }

  const input: unknown = await request.json().catch(() => null);
  if (!isRecord(input) || typeof input.orderID !== "string" || !/^[A-Z0-9-]{1,64}$/.test(input.orderID)) {
    return NextResponse.json({ error: "رقم طلب الدفع غير صالح." }, { status: 400 });
  }

  try {
    const accessToken = await getPayPalAccessToken(config);
    const order = await paypalRequest(
      config,
      accessToken,
      `/v2/checkout/orders/${encodeURIComponent(input.orderID)}/capture`,
      {
        method: "POST",
        headers: { "PayPal-Request-Id": `${input.orderID}-capture` },
        body: "{}",
      }
    );

    if (!isRecord(order) || order.status !== "COMPLETED") {
      return NextResponse.json({ error: "لم يكتمل الدفع بعد." }, { status: 409 });
    }

    const firstPurchaseUnit = Array.isArray(order.purchase_units) ? order.purchase_units[0] : null;
    const customName = isRecord(firstPurchaseUnit) ? firstPurchaseUnit.custom_id : null;
    const donorName = typeof customName === "string" && customName.trim()
      ? customName.trim().slice(0, 80)
      : "متبرع مجهول";

    return NextResponse.json(
      { status: "COMPLETED", donorName },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("PayPal order capture failed.", error);
    return NextResponse.json({ error: "تعذر تأكيد الدفع. تواصل مع PayPal قبل إعادة المحاولة." }, { status: 502 });
  }
}
