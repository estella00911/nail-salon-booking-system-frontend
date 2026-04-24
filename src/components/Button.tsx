import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "init" | "base";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  variant = "primary",
  className,
  disabled,
  onClick,
 }: ButtonProps) => {
  const base = "px-4 py-1 rounded font-medium";

  const styles:Record<ButtonVariant, string> = {
    primary: "bg-black text-white border border-transparent hover:border-black",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    init: "hover:bg-gray-100 border-white hover:border-black border-1",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    base: "",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        ${base}
        ${styles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export {Button as default,
  type ButtonVariant
};