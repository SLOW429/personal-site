import { NextResponse } from "next/server";
import { getDonationOrderDetails, publishDonationAlert } from "@/lib/donation-alerts";
import {
  getPayPalAccessToken,
  getPayPalConfig,
  isRecord,
  paypalRequest,
} from "@/lib/paypal-server";

export async function POST(request: Request) {
  const config = getPayPalConfig();
  if (!config) {
    return NextResponse.json({ error: "خدمة التنبيهات غير مكتملة الإعداد." }, { status: 503 });
  }
  if (!config.webhookId) {
    return NextResponse.json({ error: "معرّف Webhook الخاص بـ PayPal غير مضبوط." }, { status: 503 });
  }

  const event: unknown = await request.json().catch(() => null);
  if (!isRecord(event)) {
    return NextResponse.json({ error: "إشعار PayPal غير صالح." }, { status: 400 });
  }

  const transmissionId = request.headers.get("paypal-transmission-id");
  const transmissionTime = request.headers.get("paypal-transmission-time");
  const certUrl = request.headers.get("paypal-cert-url");
  const authAlgo = request.headers.get("paypal-auth-algo");
  const transmissionSig = request.headers.get("paypal-transmission-sig");

  if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
    return NextResponse.json({ error: "ترويسة التحقق من PayPal ناقصة." }, { status: 400 });
  }

  try {
    const accessToken = await getPayPalAccessToken(config);
    const verification = await paypalRequest(
      config,
      accessToken,
      "/v1/notifications/verify-webhook-signature",
      {
        method: "POST",
        body: JSON.stringify({
          auth_algo: authAlgo,
          cert_url: certUrl,
          transmission_id: transmissionId,
          transmission_sig: transmissionSig,
          transmission_time: transmissionTime,
          webhook_id: config.webhookId,
          webhook_event: event,
        }),
      }
    );

    if (!isRecord(verification) || verification.verification_status !== "SUCCESS") {
      return NextResponse.json({ error: "تعذر التحقق من توقيع إشعار PayPal." }, { status: 400 });
    }

    if (event.event_type !== "PAYMENT.CAPTURE.COMPLETED" || !isRecord(event.resource)) {
      return NextResponse.json({ received: true }, { headers: { "Cache-Control": "no-store" } });
    }

    const capture = event.resource;
    if (capture.status !== "COMPLETED" || typeof capture.id !== "string" || !isRecord(capture.amount)) {
      return NextResponse.json({ received: true }, { headers: { "Cache-Control": "no-store" } });
    }

    const amountValue = capture.amount.value;
    const currency = capture.amount.currency_code;
    if (typeof amountValue !== "string" || !/^\d+(?:\.\d{1,2})?$/.test(amountValue) || typeof currency !== "string") {
      return NextResponse.json({ error: "بيانات مبلغ التبرع غير صالحة." }, { status: 400 });
    }

    let donorName = "متبرع مجهول";
    let donorMessage = "";
    const supplementaryData = capture.supplementary_data;
    if (isRecord(supplementaryData) && isRecord(supplementaryData.related_ids)
      && typeof supplementaryData.related_ids.order_id === "string") {
      const orderId = supplementaryData.related_ids.order_id;
      const orderDetails = await getDonationOrderDetails(orderId);
      if (orderDetails?.name) donorName = orderDetails.name;
      if (orderDetails?.message) donorMessage = orderDetails.message;

      const order = await paypalRequest(
        config,
        accessToken,
        `/v2/checkout/orders/${encodeURIComponent(orderId)}`
      );
      const purchaseUnits = isRecord(order) && Array.isArray(order.purchase_units)
        ? order.purchase_units
        : [];
      const firstPurchaseUnit = purchaseUnits[0];
      const customName = isRecord(firstPurchaseUnit) ? firstPurchaseUnit.custom_id : null;
      if (donorName === "متبرع مجهول" && typeof customName === "string" && customName.trim()) {
        donorName = customName.trim().slice(0, 80);
      }
    }

    const result = await publishDonationAlert({
      id: capture.id,
      name: donorName,
      message: donorMessage,
      amount: amountValue,
      currency,
      createdAt: typeof event.create_time === "string" ? event.create_time : new Date().toISOString(),
    });

    return NextResponse.json({ received: true, published: result === 1 }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("PayPal webhook processing failed.", error);
    return NextResponse.json({ error: "تعذر معالجة إشعار PayPal." }, { status: 502 });
  }
}
