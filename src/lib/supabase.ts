import { createClient } from "@supabase/supabase-js";
import type { AirdropProject } from "./projects";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasSupabasePublicEnv() {
  return Boolean(url && anonKey);
}

export function getSupabaseBrowserClient() {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}

export function getSupabaseAdminClient() {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

export type ProjectRow = {
  id: string;
  name: string;
  slug: string;
  chain: string;
  category: string;
  status: string;
  score: number;
  risk: "Low" | "Medium" | "High";
  funding: string;
  users_label: string;
  action: string;
  tags: string[];
  website: string | null;
  quest_url: string | null;
  x_url: string | null;
  created_at: string;
  updated_at: string;
};

export function rowToProject(row: ProjectRow): AirdropProject {
  return {
    name: row.name,
    slug: row.slug,
    chain: row.chain,
    category: row.category,
    status: row.status,
    score: row.score,
    risk: row.risk,
    funding: row.funding,
    users: row.users_label,
    action: row.action,
    tags: row.tags,
    website: row.website ?? undefined,
    questUrl: row.quest_url ?? undefined,
    xUrl: row.x_url ?? undefined,
  };
}

export function projectToUpsert(project: AirdropProject) {
  return {
    name: project.name,
    slug: project.slug,
    chain: project.chain,
    category: project.category,
    status: project.status,
    score: project.score,
    risk: project.risk,
    funding: project.funding,
    users_label: project.users,
    action: project.action,
    tags: project.tags,
    website: project.website ?? null,
    quest_url: project.questUrl ?? null,
    x_url: project.xUrl ?? null,
    updated_at: new Date().toISOString(),
  };
}
