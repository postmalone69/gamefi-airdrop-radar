"use client";

import { useMemo, useState } from "react";
import type { AirdropProject } from "@/lib/projects";
import { scoreTone } from "@/lib/projects";

const chains = ["All", "Ronin", "Base", "Solana", "Immutable", "Proof of Play", "Ethereum / Layer-2", "Multi-chain"];
const risks = ["All", "Low", "Medium", "High"];

export function ScannerBoard({ projects }: { projects: AirdropProject[] }) {
  const [query, setQuery] = useState("");
  const [chain, setChain] = useState("All");
  const [risk, setRisk] = useState("All");
  const [minScore, setMinScore] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return projects
      .filter((project) => chain === "All" || project.chain === chain)
      .filter((project) => risk === "All" || project.risk === risk)
      .filter((project) => project.score >= minScore)
      .filter((project) => {
        if (!q) return true;
        return [project.name, project.chain, project.category, project.status, project.funding, project.action, ...project.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => b.score - a.score);
  }, [chain, minScore, projects, query, risk]);

  return (
    <section id="scanner" className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Scanner board</p>
          <h2 className="mt-2 text-4xl font-black">Prioritas farming minggu ini</h2>
        </div>
        <p className="max-w-xl text-zinc-400">Pantau peluang GameFi terbaru berdasarkan quest activity, chain signal, funding strength, social growth, dan risk profile.</p>
      </div>

      <div className="mb-6 grid gap-3 rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search project, chain, tag..."
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-cyan-300/30 placeholder:text-zinc-500 focus:ring-4"
        />
        <select value={chain} onChange={(event) => setChain(event.target.value)} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-cyan-300/30 focus:ring-4">
          {chains.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={risk} onChange={(event) => setRisk(event.target.value)} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-cyan-300/30 focus:ring-4">
          {risks.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={minScore} onChange={(event) => setMinScore(Number(event.target.value))} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-cyan-300/30 focus:ring-4">
          <option value={0}>All scores</option>
          <option value={70}>70%+</option>
          <option value={80}>80%+</option>
          <option value={90}>90%+</option>
        </select>
      </div>

      <div className="mb-5 flex items-center justify-between text-sm text-zinc-400">
        <span>{filtered.length} target ditemukan</span>
        <button
          type="button"
          onClick={() => { setQuery(""); setChain("All"); setRisk("All"); setMinScore(0); }}
          className="rounded-full border border-white/10 px-4 py-2 hover:border-cyan-300 hover:text-cyan-200"
        >
          Reset filter
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <article key={project.slug} className="group rounded-3xl border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-black">{project.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{project.chain} • {project.status}</p>
              </div>
              <div className={`rounded-2xl bg-gradient-to-r ${scoreTone(project.score)} px-3 py-2 font-black`}>
                {project.score}%
              </div>
            </div>
            <div className="mb-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-black/30 px-3 py-1 text-xs text-cyan-100">#{tag}</span>
              ))}
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-black/25 p-3"><dt className="text-zinc-500">Risk</dt><dd className="font-bold">{project.risk}</dd></div>
              <div className="rounded-2xl bg-black/25 p-3"><dt className="text-zinc-500">Users</dt><dd className="font-bold">{project.users}</dd></div>
              <div className="col-span-2 rounded-2xl bg-black/25 p-3"><dt className="text-zinc-500">Funding signal</dt><dd className="font-bold">{project.funding}</dd></div>
            </dl>
            <p className="mt-5 text-sm leading-6 text-zinc-300">{project.action}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.website && <ProjectLink href={project.website}>Website</ProjectLink>}
              {project.questUrl && <ProjectLink href={project.questUrl}>Quest</ProjectLink>}
              {project.xUrl && <ProjectLink href={project.xUrl}>X</ProjectLink>}
              {!project.website && !project.questUrl && !project.xUrl && <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-500">Links pending</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="rounded-full bg-cyan-300 px-4 py-2 text-xs font-black text-black hover:bg-cyan-200">
      {children} ↗
    </a>
  );
}
