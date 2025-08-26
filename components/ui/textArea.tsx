// components/ui/Textarea.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full min-h-[120px] rounded-2xl border border-gray-300 bg-white px-4 py-3 text-base shadow-sm placeholder:text-gray-400 outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/40",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";

export { Textarea };
