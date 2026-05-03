import { NextResponse } from "next/server";
import { seedProjects } from "@/lib/projects";
import { getSupabaseBrowserClient, rowToProject, type ProjectRow } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return NextResponse.json({
      source: "seed",
      updatedAt: new Date().toISOString(),
      count: seedProjects.length,
      projects: seedProjects,
    });
  }

  const { data, error } = await supabase
    .from("airdrop_projects")
    .select("*")
    .order("score", { ascending: false });

  if (error) {
    return NextResponse.json(
      { source: "supabase", error: error.message, projects: seedProjects },
      { status: 500 },
    );
  }

  const projects = (data as ProjectRow[]).map(rowToProject);

  return NextResponse.json({
    source: "supabase",
    updatedAt: new Date().toISOString(),
    count: projects.length,
    projects,
  });
}
