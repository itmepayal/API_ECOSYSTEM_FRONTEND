import Link from "next/link";
import type { OnClickProps } from "@/types";
import { NAV_LINKS } from "@/constants/navLinks";

export const NavItems = ({ onClick }: OnClickProps) => {
  return (
    <>
      {NAV_LINKS.map((link) =>
        link.to?.startsWith("#") ? (
          <a key={link.label} href={link.to} onClick={onClick}>
            {link.label}
          </a>
        ) : (
          <Link key={link.label} href={link.to} onClick={onClick}>
            {link.label}
          </Link>
        )
      )}
    </>
  );
};
