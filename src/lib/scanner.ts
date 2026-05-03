import type { AirdropProject } from "./projects";

const sourceHints = [
  { keyword: "gamefi quest", score: 18 },
  { keyword: "playtest", score: 14 },
  { keyword: "testnet", score: 14 },
  { keyword: "airdrop", score: 16 },
  { keyword: "pre-tge", score: 12 },
  { keyword: "whitelist", score: 8 },
];

export function calculateScore(input: {
  questActivity: number;
  preTge: number;
  funding: number;
  socialGrowth: number;
  riskPenalty: number;
}) {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        input.questActivity * 0.3 +
          input.preTge * 0.25 +
          input.funding * 0.2 +
          input.socialGrowth * 0.15 -
          input.riskPenalty * 0.1,
      ),
    ),
  );
}

export async function scanGameFiSources(): Promise<AirdropProject[]> {
  // MVP scanner: deterministic source model. Replace with provider adapters:
  // Galxe, Zealy, Layer3, QuestN, DappRadar, CryptoRank, X API.
  const now = new Date().toISOString().slice(0, 10);

  return [
    {
      name: `GameFi Watchlist ${now}`,
      slug: `gamefi-watchlist-${now}`,
      chain: "Multi-chain",
      category: "Scanner Signal",
      status: "Fresh source scan",
      score: calculateScore({ questActivity: 88, preTge: 80, funding: 70, socialGrowth: 66, riskPenalty: 35 }),
      risk: "Medium",
      funding: "Unverified source mix",
      users: "Scanner pending",
      action: `Review keywords: ${sourceHints.map((hint) => hint.keyword).join(", ")}. Confirm links before farming.`,
      tags: ["scanner", "fresh", "verify"],
    },
  ];
}
