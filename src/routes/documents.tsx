import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DocumentStatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AppLayout } from "@/layouts/AppLayout";
import { getDocuments } from "@/services/documentService";
import type { BidDocument } from "@/types";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — ProtoMind Document Intelligence" },
      {
        name: "description",
        content:
          "Manage uploaded bid documents, review extraction status, extracted fields and evidence references.",
      },
      { property: "og:title", content: "Documents — ProtoMind Document Intelligence" },
      {
        property: "og:description",
        content: "Uploaded bid documents, extraction status and extracted fields.",
      },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  const { data: documents = [] } = useQuery({
    queryKey: ["documents"],
    queryFn: () => getDocuments(),
  });
  const [selected, setSelected] = useState<BidDocument | null>(null);

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Document intelligence"
        title="Documents"
        subtitle="All bid documents ingested for the current tender workspace."
      />

      <div className="card-surface overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3 font-medium">Document</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Tender</th>
              <th className="px-5 py-3 font-medium">Processing Status</th>
              <th className="px-5 py-3 font-medium">Uploaded</th>
              <th className="px-5 py-3 font-medium">Confidence</th>
              <th className="px-5 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr
                key={doc.id}
                onClick={() => setSelected(doc)}
                className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/50"
              >
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-2 font-medium text-foreground">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {doc.fileName}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{doc.documentType}</td>
                <td className="num px-5 py-3 text-muted-foreground">{doc.tenderNumber}</td>
                <td className="px-5 py-3">
                  <DocumentStatusBadge status={doc.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-muted-foreground">
                  {doc.uploadedAt}
                </td>
                <td className="num px-5 py-3 text-foreground">{doc.confidence}%</td>
                <td className="px-5 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(doc);
                    }}
                  >
                    Open
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{selected?.fileName}</SheetTitle>
            <SheetDescription>
              {selected?.documentType} · {selected?.tenderNumber}
            </SheetDescription>
          </SheetHeader>
          {selected && (
            <div className="space-y-5 px-4 pb-8">
              <div className="rounded-lg border border-dashed border-border bg-muted/40 p-6 text-center">
                <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  {selected.fileName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Page 1 of {selected.pages} · source preview available once the backend
                  renders document pages
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Extracted fields
                </p>
                <ul className="mt-2 divide-y divide-border rounded-md border border-border">
                  {selected.extractedFields.map((field) => (
                    <li
                      key={field.label}
                      className="flex items-center justify-between gap-4 px-3 py-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {field.value}
                        </p>
                        <p className="text-xs text-muted-foreground">{field.label}</p>
                      </div>
                      <span className="num text-xs text-muted-foreground">
                        {field.confidence}%
                      </span>
                    </li>
                  ))}
                  {selected.extractedFields.length === 0 && (
                    <li className="px-3 py-3 text-sm text-muted-foreground">
                      Extraction pending for this document.
                    </li>
                  )}
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-lg border border-border p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Pages</p>
                  <p className="num text-sm font-medium text-foreground">
                    {selected.pages}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Size</p>
                  <p className="text-sm font-medium text-foreground">
                    {selected.sizeLabel}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <p className="num text-sm font-medium text-foreground">
                    {selected.confidence}%
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Evidence references from this document appear in the compliance analysis
                for tender {selected.tenderNumber}.
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
}
