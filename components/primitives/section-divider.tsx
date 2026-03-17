export const SectionDivider = ({ className = "" }) => {
  return (
    <div className={`relative w-full border-b border-zinc-800 ${className}`}>
      <div className="absolute left-0 right-0 pointer-events-none flex justify-between px-4 md:px-10 lg:px-24 xl:px-32 -mt-1.5">
        <div className="w-2.5 h-2.5 bg-white rotate-45"></div>
        <div className="w-2.5 h-2.5 bg-white rotate-45"></div>
      </div>
    </div>
  );
};
