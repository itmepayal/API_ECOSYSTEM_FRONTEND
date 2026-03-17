import type { AlertProps } from "@/types";

export const Alert = ({ type, message, onClose }: AlertProps) => {
  const color =
    type === "success"
      ? "text-green-600 bg-green-600/10 border-green-600"
      : "text-red-600 bg-red-600/10 border-red-600";

  return (
    <div
      className={`flex items-center mt-2 justify-between w-full border rounded-lg h-10 shadow ${color}`}
    >
      <div className="flex items-center gap-2 px-3">
        <p className="text-sm">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="active:scale-90 transition-all mr-3"
        >
          ✕
        </button>
      )}
    </div>
  );
};
