import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

import type { InputFieldProps } from "@/types";

type PasswordFieldProps = Omit<InputFieldProps, "type">;

export const PasswordField = ({
  placeholder = "Enter password",
  className = "",
  name,
  value,
  onChange,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`flex items-center w-full border border-[#242424] h-12 rounded-xl overflow-hidden px-4 gap-2 bg-[#111] ${className}`}
    >
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent text-gray-300 placeholder-gray-500 outline-none text-sm w-full h-full"
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="text-gray-400 hover:text-gray-200 transition"
      >
        {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
      </button>
    </div>
  );
};
