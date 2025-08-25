// components/Button.tsx
import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
    outline:
      "border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-400",
    ghost: "text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
