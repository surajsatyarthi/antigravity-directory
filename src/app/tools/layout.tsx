import { ToolsShell } from "@/components/tools/ToolsShell";
import { Header } from "@/components/Header";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <ToolsShell>{children}</ToolsShell>
    </div>
  );
}
