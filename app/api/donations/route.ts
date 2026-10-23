import { NextResponse } from "next/server";
import { getRecentDonationAlerts } from "@/lib/donation-alerts";

export async function GET() {
  try {
    const donations = await getRecentDonationAlerts();
    return NextResponse.json({ donations }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Could not load donation alerts.", error);
    return NextResponse.json(
      { error: "تنبيهات التبرع غير متاحة حاليًا." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
