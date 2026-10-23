import { NextResponse } from "next/server";
import { getPayPalConfig } from "@/lib/paypal-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = getPayPalConfig();
  if (!config) {
    return NextResponse.json(
      { error: "خدمة الدفع غير مكتملة الإعداد." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    { clientId: config.clientId },
    { headers: { "Cache-Control": "no-store" } }
  );
}
