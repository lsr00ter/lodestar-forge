import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const tagVariants = cva(
  "inline-flex uppercase items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      color: {
        gray: "bg-stone-500/10 text-stone-500 border-stone-500/15",
        green: "bg-green-500/10 text-green-600 border-green-500/15",
        red: "bg-red-500/10 text-red-500 border-red-500/15",
        amber: "bg-amber-500/10 text-amber-500 border-amber-500/15",
        purple: "bg-purple-500/10 text-purple-500 border-purple-500/15",
        blue: "bg-blue-500/10 text-blue-500 border-blue-500/15",
        orange: "bg-orange-500/10 text-orange-500 border-orange-500/15",
        pink: "bg-pink-500/10 text-pink-500 border-pink-500/15",
        teal: "bg-teal-500/10 text-teal-500 border-teal-500/15",
      },
    },
    defaultVariants: {
      color: "gray",
    },
  },
);

export function Tag({ color, className, children }) {
  return (
    <div className={cn(tagVariants({ color, className }))}>{children}</div>
  );
}
