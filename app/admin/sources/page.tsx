"use client";
import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SourcesPage() {
  const [client, setClient] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [sourceType, setSourceType] = useState("irs_form");
  const [year, setYear] = useState("2025");
  const [topic, setTopic] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("Loading secure source workspace…");

  useEffect(() => {
    try { setClient(createClient()); setMessage(""); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Unable to load the source workspace."); }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || !file) return;
    setBusy(true); setMessage("");
    try {
      const invoke = async (body: Record<string, unknown>) => {
        const { data, error } = await client.functions.invoke("manage-source-documents", { body });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        return data;
      };
      const upload = await invoke({ action: "create_upload", file_name: file.name, mime_type: file.type, file_size: file.size });
      const { error: uploadError } = await client.storage.from("knowledge-sources").uploadToSignedUrl(upload.path, upload.token, file, { contentType: file.type });
      if (uploadError) throw uploadError;
      await invoke({ action: "create_document", title: title || file.name.replace(/\.[^.]+$/, ""), file_name: file.name, mime_type: file.type, storage_path: upload.path, source_type: sourceType, tax_year: year ? Number(year) : null, topic });
      setFile(null); setTitle(""); setTopic(""); setMessage("Source saved as Draft. Activate it only after review.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Upload failed."); }
    finally { setBusy(false); }
  }

  return <main className="mx-auto max-w-3xl px-6 py-10"><p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Admin only</p><h1 className="mt-2 text-3xl font-bold text-slate-950">Knowledge sources</h1><p className="mt-2 text-slate-600">Upload approved reference material. Files remain private and begin in Draft status.</p><form className="mt-8 grid gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={submit}><label>File<input className="mt-1 block w-full" type="file" accept=".pdf,.docx,.txt,.md" required onChange={(e) => setFile(e.target.files?.[0] || null)} /></label><label>Title<input className="mt-1 block w-full rounded border p-2" value={title} required onChange={(e) => setTitle(e.target.value)} /></label><label>Source type<select className="mt-1 block w-full rounded border p-2" value={sourceType} onChange={(e) => setSourceType(e.target.value)}><option value="irs_form">IRS form</option><option value="irs_instructions">IRS instructions</option><option value="irs_publication">IRS publication</option><option value="internal_training">Internal training</option><option value="course_material">Course material</option><option value="office_policy">Office policy</option><option value="other">Other</option></select></label><label>Tax year<input className="mt-1 block w-full rounded border p-2" value={year} onChange={(e) => setYear(e.target.value)} /></label><label>Topic<input className="mt-1 block w-full rounded border p-2" value={topic} onChange={(e) => setTopic(e.target.value)} /></label><button className="rounded bg-slate-950 px-4 py-2 text-white disabled:opacity-50" disabled={!client || !file || busy}>{busy ? "Uploading…" : "Upload as Draft"}</button>{message && <p className="text-sm text-slate-600" role="status">{message}</p>}</form></main>;
}
