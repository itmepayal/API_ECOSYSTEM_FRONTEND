import { IconButtonProps } from "@/types";
import { forwardRef, memo } from "react";

const _IconButton = (
  {
    to,
    label,
    icon,
    className = "",
    onClick,
    ariaLabel,
    ariaExpanded,
    ariaControls,
    type = "button",
    loading = false,
  }: IconButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>
) => {
  const baseClass =
    "flex items-center justify-center gap-2 bg-gradient-to-b from-[#1E1E1E] to-[#050505] border border-[#242424] text-xs md:text-sm px-4 py-3 rounded-lg transition cursor-pointer hover:border-gray-500 disabled:opacity-60 disabled:cursor-not-allowed";

  if (to) {
    return (
      <a
        href={to}
        ref={ref as React.Ref<HTMLAnchorElement>}
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={`${baseClass} ${className}`}
      >
        {label && <span>{label}</span>}
        {icon}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      ref={ref as React.Ref<HTMLButtonElement>}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={`${baseClass} ${className}`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        <>
          {label && <span>{label}</span>}
          {icon}
        </>
      )}
    </button>
  );
};

export const IconButton = memo(forwardRef(_IconButton));
