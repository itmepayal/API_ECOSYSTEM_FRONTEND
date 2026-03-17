import { memo } from "react";
import { IconLoader2 } from "@tabler/icons-react";

export const Loader = memo(() => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <IconLoader2 size={40} className="animate-spin text-white" />
    </div>
  );
});
