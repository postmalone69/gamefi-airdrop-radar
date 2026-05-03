"use client";

import { FormEvent, useState } from "react";

const emptyProject = {
  name: "",
  slug: "",
  chain: "Base",
  category: "GameFi",
  status: "Watchlist",
  score: 70,
  risk: "Medium",
  funding: "Unknown",
  users: "Early",
  action: "Review quests and official links before farming.",
  tags: "gamefi,airdrop",
  website: "",
  questUrl: "",
  xUrl: "",
};

export function AdminProjectForm() {
  const [secret, setSecret] = useState("");
  const [project, setProject] = useState(emptyProject);
  const [status, setStatus] = useState<{ type: "idle" | "ok" | "error"; message: string }>({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof emptyProject, value: string | number) {
    setProject((current) => ({ ...current, [key]: value }));
  }

  function autoSlug(name: string) {
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setProject((current) => ({ ...current, name, slug: current.slug || slug }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    const payload = {
      projects: [
        {
          ...project,
          score: Number(project.score),
          risk: project.risk as "Low" | "Medium" | "High",
          tags: project.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
          website: project.website || undefined,
          questUrl: project.questUrl || undefined,
          xUrl: project.xUrl || undefined,
        },
      ],
    };

    const response = await fetch("/api/admin/ingest", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${secret.trim()}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: data.error ?? "Save failed" });
      return;
    }

    setStatus({ type: "ok", message: "Project saved. Homepage/API akan update langsung." });
    setProject(emptyProject);
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6">
      <div className="mb-6">
        <label className="mb-2 block text-sm font-bold text-zinc-300">Admin secret</label>
        <input value={secret} onChange={(event) => setSecret(event.target.value)} required type="password" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none ring-cyan-300/30 focus:ring-4" placeholder="ADMIN_INGEST_SECRET" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Project name" value={project.name} onChange={autoSlug} required />
        <Field label="Slug" value={project.slug} onChange={(value) => update("slug", value)} required />
        <Field label="Chain" value={project.chain} onChange={(value) => update("chain", value)} required />
        <Field label="Category" value={project.category} onChange={(value) => update("category", value)} required />
        <Field label="Status" value={project.status} onChange={(value) => update("status", value)} required />
        <Field label="Score" value={String(project.score)} onChange={(value) => update("score", Number(value))} type="number" required />
        <Select label="Risk" value={project.risk} onChange={(value) => update("risk", value)} options={["Low", "Medium", "High"]} />
        <Field label="Users" value={project.users} onChange={(value) => update("users", value)} required />
        <Field label="Funding" value={project.funding} onChange={(value) => update("funding", value)} required />
        <Field label="Tags comma-separated" value={project.tags} onChange={(value) => update("tags", value)} required />
        <Field label="Website URL" value={project.website} onChange={(value) => update("website", value)} />
        <Field label="Quest URL" value={project.questUrl} onChange={(value) => update("questUrl", value)} />
        <Field label="X/Twitter URL" value={project.xUrl} onChange={(value) => update("xUrl", value)} />
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-bold text-zinc-300">Action plan</label>
        <textarea value={project.action} onChange={(event) => update("action", event.target.value)} required rows={4} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none ring-cyan-300/30 focus:ring-4" />
      </div>

      {status.message && (
        <p className={`mt-4 rounded-2xl px-4 py-3 text-sm ${status.type === "ok" ? "bg-emerald-400/15 text-emerald-200" : "bg-red-400/15 text-red-200"}`}>
          {status.message}
        </p>
      )}

      <button disabled={loading} className="mt-6 rounded-full bg-cyan-300 px-6 py-3 font-black text-black hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? "Saving..." : "Save project"}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-zinc-300">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} type={type} required={required} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none ring-cyan-300/30 focus:ring-4" />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-zinc-300">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none ring-cyan-300/30 focus:ring-4">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
