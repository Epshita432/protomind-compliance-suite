import { ComplianceBadge } from "@/components/StatusBadge";
import type { Requirement } from "@/types";

export function RequirementTable({ requirements }: { requirements: Requirement[] }) {
  return (
    <div className="card-surface overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-5 py-3 font-medium">Code</th>
            <th className="px-5 py-3 font-medium">Requirement</th>
            <th className="px-5 py-3 font-medium">Category</th>
            <th className="px-5 py-3 font-medium">Mandatory</th>
            <th className="px-5 py-3 font-medium">Validation Type</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((req) => (
            <tr
              key={req.id}
              className="border-b border-border last:border-0 hover:bg-muted/50"
            >
              <td className="num px-5 py-3 font-medium text-foreground">{req.code}</td>
              <td className="max-w-md px-5 py-3 text-foreground">{req.text}</td>
              <td className="px-5 py-3 text-muted-foreground">{req.category}</td>
              <td className="px-5 py-3 text-muted-foreground">
                {req.mandatory ? "Yes" : "No"}
              </td>
              <td className="px-5 py-3 text-muted-foreground">{req.validationType}</td>
              <td className="px-5 py-3">
                <ComplianceBadge status={req.status} />
              </td>
            </tr>
          ))}
          {requirements.length === 0 && (
            <tr>
              <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                No requirements defined for this tender.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
