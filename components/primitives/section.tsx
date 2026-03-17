import { Suspense } from "react";
import type { SectionProps } from "@/types";
import { Loader } from "@/components/primitives/loader";

const Section = ({ children, fallback = <Loader /> }: SectionProps) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default Section;
