import { createClient } from "@supabase/supabase-js";

const projects = [
  ["Pixels", "pixels", "Ronin", "Farming / Social Game", "Live quests", 91, "Medium", "Strong ecosystem support", "High", "Track seasonal quests, land mechanics, token utility, and partner campaigns.", ["Ronin", "quests", "social"]],
  ["Parallel Colony", "parallel-colony", "Base", "AI GameFi", "Early access watch", 87, "Medium", "Tier-1 attention", "Growing", "Monitor access waves, NFT ownership perks, and Base ecosystem quests.", ["Base", "AI", "NFT"]],
  ["Nyan Heroes", "nyan-heroes", "Solana", "Shooter", "Campaigns active", 84, "Medium", "Backed", "Growing", "Join missions, check playtest windows, claim badges, preserve wallet history.", ["Solana", "playtest", "badges"]],
];

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });
const rows = projects.map(([name, slug, chain, category, status, score, risk, funding, users_label, action, tags]) => ({
  name, slug, chain, category, status, score, risk, funding, users_label, action, tags,
  updated_at: new Date().toISOString(),
}));

const { error } = await supabase.from("airdrop_projects").upsert(rows, { onConflict: "slug" });
if (error) throw error;
console.log(`Seeded ${rows.length} projects`);
