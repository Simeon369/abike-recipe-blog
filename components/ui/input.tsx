// components/ui/Input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-base shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/40",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
