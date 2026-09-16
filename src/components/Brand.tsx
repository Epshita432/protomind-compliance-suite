import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brand({
  size = "md",
  showSubtitle = false,
  className,
}: {
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  className?: string;
}) {
  const iconSize = size === "lg" ? "h-11 w-11" : size === "md" ? "h-9 w-9" : "h-8 w-8";
  const textSize =
    size === "lg" ? "text-2xl" : size === "md" ? "text-base" : "text-sm";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-md bg-primary text-primary-foreground",
          iconSize,
        )}
      >
        <ShieldCheck className={size === "lg" ? "h-6 w-6" : "h-5 w-5"} strokeWidth={2} />
      </div>
      <div className="leading-tight">
        <div className={cn("font-semibold tracking-[0.14em] text-foreground", textSize)}>
          PROTOMIND
        </div>
        {showSubtitle && (
          <div className="text-xs text-muted-foreground">
            AI-Powered Tender Compliance &amp; Risk Intelligence
          </div>
        )}
      </div>
    </div>
  );
}
