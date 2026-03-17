import { memo } from "react";
import type { DescriptionProps } from "@/types";

export const Description = memo(
  ({ children, className = "" }: DescriptionProps) => {
    return (
      <p
        className={`text-sm md:text-base text-center font-light max-w-3xl md:max-w-2xl mt-5 px-5 ${className}`}
      >
        {children}
      </p>
    );
  }
);
