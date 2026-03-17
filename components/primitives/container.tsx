import type { ContainerProps } from "@/types";

export const Container = ({ id, children, className = "" }: ContainerProps) => {
  return (
    <section
      id={id}
      className={`flex flex-col items-center bg-black text-white relative overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
};
