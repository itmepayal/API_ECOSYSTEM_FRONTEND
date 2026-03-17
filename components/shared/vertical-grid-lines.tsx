export const VerticalGridLines = ({ className = "" }) => {
  return (
    <div
      className={`absolute left-0 right-0 bottom-0 pointer-events-none flex justify-between px-4 md:px-10 lg:px-24 xl:px-32 ${className}`}
    >
      <div className="w-px bg-zinc-800"></div>
      <div className="w-px bg-zinc-800"></div>
    </div>
  );
};
