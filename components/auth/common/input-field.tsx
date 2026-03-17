import type { InputFieldProps } from "@/types";

export const InputField = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  className = "",
}: InputFieldProps) => {
  return (
    <div
      className={`flex items-center w-full border border-[#242424] h-12 rounded-xl overflow-hidden px-4 gap-2 bg-[#111] ${className}`}
    >
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent text-gray-300 placeholder-gray-500 outline-none text-sm w-full h-full"
      />
    </div>
  );
};
