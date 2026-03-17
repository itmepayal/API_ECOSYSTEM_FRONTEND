import type { AuthTextProps } from "@/types";
import Link from "next/link";

export const AuthText = ({
  text,
  linkText,
  linkTo,
  className = "",
}: AuthTextProps) => {
  return (
    <p className={`text-gray-400 text-sm mt-6 text-center ${className}`}>
      {text}{" "}
      <Link href={linkTo} className="text-white hover:underline">
        {linkText}
      </Link>
    </p>
  );
};
