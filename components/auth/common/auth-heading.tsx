import type { HeadingProps as AuthHeadingType } from "@/types";

export const AuthHeading = ({
  label,
  description,
  className = "",
}: AuthHeadingType) => {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-2xl md:text-3xl font-semibold text-white">{label}</h2>

      {description && (
        <p className="text-gray-400 text-sm mt-3 max-w-sm mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
