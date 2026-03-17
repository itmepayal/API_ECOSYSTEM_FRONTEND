import Link from "next/link";
import { IconCode } from "@tabler/icons-react";

export const Logo = () => {
  return (
    <Link
      href="/"
      aria-label="Free API Home"
      className="flex items-center gap-2"
    >
      {/* Icon wrapper */}
      <span className="flex items-center justify-center gap-1.5 bg-linear-to-b from-[#1E1E1E] to-[#050505] border border-[#242424] px-2 py-2 rounded-lg text-sm transition">
        <IconCode size={30} stroke={2} aria-hidden="true" />
      </span>

      {/* Text */}
      <span className="text-2xl font-semibold hidden lg:flex">Free API</span>
    </Link>
  );
};
