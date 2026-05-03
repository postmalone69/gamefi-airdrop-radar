import { scoreTone, seedProjects } from "@/lib/projects";
import { getSupabaseBrowserClient, rowToProject, type ProjectRow } from "@/lib/supabase";

async function getProjects() {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) return { projects: seedProjects, source: "seed" };

  const { data, error } = await supabase
    .from("airdrop_projects")
    .select("*")
    .order("score", { ascending: false });

  if (error || !data?.length) return { projects: seedProjects, source: "fallback" };

  return { projects: (data as ProjectRow[]).map(rowToProject), source: "supabase" };
}

export default async function Home() {
  const { projects, source } = await getProjects();
  const topProject = projects[0];
  const stats = [
    { label: "Tracked projects", value: projects.length.toString() },
    { label: "High-score targets", value: projects.filter((p) => p.score >= 80).length.toString() },
    { label: "Chains covered", value: new Set(projects.map((p) => p.chain)).size.toString() },
    { label: "Data source", value: source },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#070A12] text-white">
      <section className="relative px-6 py-10 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.18),_transparent_30%),linear-gradient(180deg,_#070A12,_#0A1020)]" />
        <div className="relative mx-auto max-w-7xl">
          <nav className="mb-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-2xl bg-cyan-400 font-black text-black shadow-[0_0_30px_rgba(34,211,238,.45)]">G</div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">GameFi</p>
                <h1 className="font-semibold">Airdrop Radar</h1>
              </div>
            </div>
            <a className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:border-cyan-300 hover:text-cyan-200" href="#scanner">
              Open scanner
            </a>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
                Public MVP • Vercel-ready • Airdrop intelligence
              </p>
              <h2 className="max-w-4xl text-5xl font-black tracking-tight sm:text-7xl">
                Scanner project <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-yellow-200 bg-clip-text text-transparent">GameFi airdrop</span> untuk semua orang.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                Radar ini mengurutkan project GameFi berdasarkan chance airdrop, aktivitas quest, chain, funding signal, dan risk profile. Fokus: cepat, bersih, mudah deploy.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="rounded-full bg-cyan-300 px-6 py-3 font-bold text-black shadow-[0_0_34px_rgba(34,211,238,.35)] hover:bg-cyan-200" href="#scanner">
                  Scan targets
                </a>
                <a className="rounded-full border border-white/15 px-6 py-3 font-bold text-white hover:border-emerald-300" href="#method">
                  Scoring method
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-400">Top signal</p>
              <div className="rounded-3xl bg-black/30 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-black">{topProject.name}</h3>
                    <p className="mt-2 text-zinc-300">{topProject.chain} • {topProject.category}</p>
                  </div>
                  <div className={`rounded-2xl bg-gradient-to-r ${scoreTone(topProject.score)} px-4 py-3 text-2xl font-black`}>
                    {topProject.score}
                  </div>
                </div>
                <p className="mt-6 text-zinc-300">{topProject.action}</p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-2xl font-black text-cyan-200">{item.value}</p>
                    <p className="text-sm text-zinc-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="scanner" className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Scanner board</p>
            <h2 className="mt-2 text-4xl font-black">Prioritas farming minggu ini</h2>
          </div>
          <p className="max-w-xl text-zinc-400">Pantau peluang GameFi terbaru berdasarkan quest activity, chain signal, funding strength, social growth, dan risk profile.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.name} className="group rounded-3xl border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]">
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
            </article>
          ))}
        </div>
      </section>

      <section id="method" className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-200">Scoring engine</p>
          <h2 className="mt-2 text-3xl font-black">Formula awal</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["Quest activity", "30%"],
              ["Pre-TGE status", "25%"],
              ["Funding / ecosystem", "20%"],
              ["Social + on-chain growth", "15%"],
              ["Risk penalty", "-10%"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-black/25 p-4">
                <p className="text-2xl font-black text-emerald-200">{value}</p>
                <p className="text-sm text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
