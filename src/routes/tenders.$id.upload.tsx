import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, FileText, Loader2, Trash2, UploadCloud } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { DocumentStatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/layouts/AppLayout";
import { documents as demoDocuments } from "@/data/demoData";
import {
  formatSize,
  inferDocumentType,
  uploadDocuments,
} from "@/services/documentService";
import type { BidDocument, DocumentStatus } from "@/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tenders/$id/upload")({
  head: () => ({
    meta: [
      { title: "Upload Bid Documents — ProtoMind" },
      {
        name: "description",
        content:
          "Upload bid documents for extraction, requirement matching and rule-based compliance validation.",
      },
      { property: "og:title", content: "Upload Bid Documents — ProtoMind" },
      {
        property: "og:description",
        content: "Drag and drop bid documents to start a compliance analysis.",
      },
    ],
  }),
  component: UploadPage,
});

const progression: DocumentStatus[] = ["Uploaded", "Processing", "Extracting", "Completed"];

function UploadPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState<BidDocument[]>(
    demoDocuments.map((d) => ({ ...d, status: "Uploaded" as DocumentStatus })),
  );
  const [dragging, setDragging] = useState(false);
  const [starting, setStarting] = useState(false);

  // Simulated extraction pipeline for the demo.
  useEffect(() => {
    const timers = progression.slice(1).map((status, index) =>
      setTimeout(
        () => setFiles((prev) => prev.map((f) => ({ ...f, status }))),
        (index + 1) * 900,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const addFiles = useCallback(
    async (list: FileList | null) => {
      if (!list || list.length === 0) return;
      const uploaded = await uploadDocuments({
        tenderId: id,
        files: Array.from(list).map((f) => ({ name: f.name, size: f.size })),
      });
      setFiles((prev) => [...uploaded, ...prev]);
      toast.success(`${uploaded.length} document(s) added to the bid submission.`);
      setTimeout(
        () =>
          setFiles((prev) =>
            prev.map((f) =>
              uploaded.some((u) => u.id === f.id) ? { ...f, status: "Completed" } : f,
            ),
          ),
        1400,
      );
    },
    [id],
  );

  const analyze = async () => {
    setStarting(true);
    navigate({ to: "/analyze", search: { tenderId: id } });
  };

  const completed = files.filter((f) => f.status === "Completed").length;

  return (
    <AppLayout>
      <Link
        to="/tenders/$id"
        params={{ id }}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Tender details
      </Link>

      <PageHeader
        eyebrow="GEM-2026-001 · ABC Technologies Pvt. Ltd."
        title="Upload Bid Documents"
        subtitle="Documents are extracted and classified before requirement matching."
        actions={
          <Button onClick={() => void analyze()} disabled={starting || files.length === 0}>
            {starting && <Loader2 className="h-4 w-4 animate-spin" />}
            ANALYZE BID
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            void addFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-center transition-colors",
            dragging ? "border-primary bg-accent" : "border-border bg-card",
          )}
        >
          <input
            type="file"
            multiple
            className="hidden"
            accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
            onChange={(e) => void addFiles(e.target.files)}
          />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <UploadCloud className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-4 text-sm font-medium text-foreground">
            Drag and drop documents here.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            or click to browse from your device
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Supported: PDF • DOCX • XLSX • JPG • PNG
          </p>
        </label>

        <div className="card-surface">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Uploaded documents</h2>
              <p className="text-xs text-muted-foreground">
                {completed} of {files.length} processed
              </p>
            </div>
          </div>
          <ul className="divide-y divide-border">
            {files.map((file) => (
              <li key={file.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-secondary">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {file.fileName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {file.documentType} · {file.sizeLabel}
                  </p>
                </div>
                <DocumentStatusBadge status={file.status} />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${file.fileName}`}
                  onClick={() => {
                    setFiles((prev) => prev.filter((f) => f.id !== file.id));
                    toast.message(`${file.fileName} removed.`);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </li>
            ))}
            {files.length === 0 && (
              <li className="px-5 py-10 text-center text-sm text-muted-foreground">
                No documents in this bid submission yet.
              </li>
            )}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Demo Mode — files stay in your browser. Uploads will be sent to the FastAPI
        backend once connected. Size shown for demo documents is illustrative.
        {formatSize(0) === "—" ? "" : ""}
        {inferDocumentType("") === "" ? "" : ""}
      </p>
    </AppLayout>
  );
}
