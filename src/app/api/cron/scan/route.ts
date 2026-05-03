import { NextRequest, NextResponse } from "next/server";
import { scanGameFiSources } from "@/lib/scanner";
import { getSupabaseAdminClient, projectToUpsert } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const expectedSecret = process.env.CRON_SECRET;
  const providedSecret = request.headers.get("authorization")?.replace("Bearer ", "");

  if (expectedSecret && providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const scanned = await scanGameFiSources();
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json({
      mode: "dry-run",
      message: "SUPABASE_SERVICE_ROLE_KEY not configured. Returning scan result only.",
      scanned,
    });
  }

  const { error } = await supabase
    .from("airdrop_projects")
    .upsert(scanned.map(projectToUpsert), { onConflict: "slug" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ mode: "upsert", count: scanned.length, scanned });
}
