import type { LabelProps } from "@/types";

export default function Divider({ label }: LabelProps) {
  return (
    <div className="flex items-center gap-4 w-full my-6">
      <div className="w-full h-px bg-white/15"></div>
      <p className="text-sm text-gray-400 whitespace-nowrap">{label}</p>
      <div className="w-full h-px bg-white/15"></div>
    </div>
  );
}
