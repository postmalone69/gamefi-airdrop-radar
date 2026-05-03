export type AirdropProject = {
  name: string;
  slug: string;
  chain: string;
  category: string;
  status: string;
  score: number;
  risk: "Low" | "Medium" | "High";
  funding: string;
  users: string;
  action: string;
  tags: string[];
  website?: string;
  questUrl?: string;
  xUrl?: string;
};

export const seedProjects: AirdropProject[] = [
  {
    name: "Pixels",
    slug: "pixels",
    chain: "Ronin",
    category: "Farming / Social Game",
    status: "Live quests",
    score: 91,
    risk: "Medium",
    funding: "Strong ecosystem support",
    users: "High",
    action: "Track seasonal quests, land mechanics, token utility, and partner campaigns.",
    tags: ["Ronin", "quests", "social"],
    website: "https://www.pixels.xyz/",
  },
  {
    name: "Parallel Colony",
    slug: "parallel-colony",
    chain: "Base",
    category: "AI GameFi",
    status: "Early access watch",
    score: 87,
    risk: "Medium",
    funding: "Tier-1 attention",
    users: "Growing",
    action: "Monitor access waves, NFT ownership perks, and Base ecosystem quests.",
    tags: ["Base", "AI", "NFT"],
  },
  {
    name: "Nyan Heroes",
    slug: "nyan-heroes",
    chain: "Solana",
    category: "Shooter",
    status: "Campaigns active",
    score: 84,
    risk: "Medium",
    funding: "Backed",
    users: "Growing",
    action: "Join missions, check playtest windows, claim badges, preserve wallet history.",
    tags: ["Solana", "playtest", "badges"],
  },
  {
    name: "Illuvium",
    slug: "illuvium",
    chain: "Immutable",
    category: "AAA GameFi",
    status: "Ecosystem quests",
    score: 79,
    risk: "Low",
    funding: "Established",
    users: "High",
    action: "Track Immutable passport quests and asset interaction campaigns.",
    tags: ["Immutable", "passport", "AAA"],
  },
  {
    name: "Pirate Nation",
    slug: "pirate-nation",
    chain: "Proof of Play",
    category: "On-chain RPG",
    status: "Live economy",
    score: 76,
    risk: "Medium",
    funding: "Backed",
    users: "Active",
    action: "Watch chain expansion, resource loops, referral and creator campaigns.",
    tags: ["on-chain", "RPG", "economy"],
  },
  {
    name: "My Pet Hooligan",
    slug: "my-pet-hooligan",
    chain: "Ethereum / Layer-2",
    category: "Action Game",
    status: "Beta ecosystem",
    score: 72,
    risk: "High",
    funding: "Known brand",
    users: "Niche",
    action: "Prioritize free quests only; avoid expensive NFTs until signal improves.",
    tags: ["beta", "NFT", "watchlist"],
  },
];

export function scoreTone(score: number) {
  if (score >= 85) return "from-emerald-400 to-cyan-400 text-black";
  if (score >= 75) return "from-yellow-300 to-orange-400 text-black";
  return "from-zinc-600 to-zinc-500 text-white";
}
