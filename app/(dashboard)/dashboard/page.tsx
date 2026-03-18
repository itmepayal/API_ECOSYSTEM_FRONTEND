import { SectionCards } from "@/components/ui/section-cards";
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";

export default function DashboardPage() {
  return (
    <>
      <SectionCards />

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </>
  );
}
