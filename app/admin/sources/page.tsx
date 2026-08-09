export const dynamic = "force-dynamic";

export default function SourcesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Admin only</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-950">Knowledge sources</h1>
      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">Source workspace initializing</h2>
        <p className="mt-2 text-slate-600">The secure source-document backend is active. The interactive upload screen is being finalized after the deployment environment is verified.</p>
        <p className="mt-4 text-sm text-slate-500">Source documents remain private and must be reviewed before becoming Active.</p>
      </section>
    </main>
  );
}
