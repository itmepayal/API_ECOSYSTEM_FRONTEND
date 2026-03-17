import { IconButton } from "@/components/primitives/icon-button";
import type { AuthButton as AuthButtonType } from "@/types";

export function AuthButton({ label, onClick, loading }: AuthButtonType) {
  return (
    <IconButton
      type="submit"
      label={label}
      ariaLabel={label}
      onClick={onClick}
      loading={loading}
      className="mt-6 sm:mt-8 w-full h-11 sm:h-12 justify-center text-white"
    />
  );
}
