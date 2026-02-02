import { ToolsShell } from "@/components/tools/ToolsShell";
import { MarketplaceHeader } from "@/components/MarketplaceHeader";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <MarketplaceHeader />
      <ToolsShell>{children}</ToolsShell>
    </div>
  );
}
