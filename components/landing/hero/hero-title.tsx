import { memo } from "react";
import type { LabelProps } from "@/types";

export const HeroTitle = memo(({ label }: LabelProps) => {
  return (
    <h1
      className="text-2xl md:text-5xl lg:text-[64px] text-center max-w-4xl mt-3 
      bg-linear-to-r from-white to-[#313131] text-transparent bg-clip-text 
      leading-tight px-4 md:px-10"
    >
      {label}
    </h1>
  );
});
