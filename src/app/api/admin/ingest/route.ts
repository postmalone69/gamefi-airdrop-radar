import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient, projectToUpsert } from "@/lib/supabase";
import type { AirdropProject } from "@/lib/projects";

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.ADMIN_INGEST_SECRET?.trim();
  const providedSecret = request.headers.get("authorization")?.replace("Bearer ", "").trim();

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { projects?: AirdropProject[] };
  const projects = body.projects ?? [];

  if (!projects.length) {
    return NextResponse.json({ error: "No projects provided" }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase admin env not configured" }, { status: 500 });
  }

  const { error } = await supabase
    .from("airdrop_projects")
    .upsert(projects.map(projectToUpsert), { onConflict: "slug" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count: projects.length });
}
