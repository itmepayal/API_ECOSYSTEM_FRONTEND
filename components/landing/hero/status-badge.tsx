import type { LabelProps } from "@/types";
import { memo } from "react";

const StatusBadgeComponent = ({ label }: LabelProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pl-2.5 pr-4 py-1.5 mt-30 rounded-full bg-[#050505] border border-white/15">
      <div className="relative flex size-3.5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
        <span className="relative inline-flex size-2 rounded-full bg-green-600"></span>
      </div>
      <p className="text-sm">{label}</p>
    </div>
  );
};

export const StatusBadge = memo(StatusBadgeComponent);
