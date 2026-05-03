import Link from "next/link";
import { AdminProjectForm } from "@/components/admin-project-form";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#070A12] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-8 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:border-cyan-300 hover:text-cyan-200">
          ← Back to radar
        </Link>
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Admin v1</p>
          <h1 className="mt-3 text-4xl font-black">Tambah / update project</h1>
          <p className="mt-4 text-zinc-400">
            Masukkan admin secret Vercel, isi data project, lalu save ke Supabase. Jika slug sama, data akan update otomatis.
          </p>
        </div>
        <AdminProjectForm />
      </div>
    </main>
  );
}
