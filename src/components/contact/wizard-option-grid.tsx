"use client";

import { cn } from "@/lib/utils";

export type WizardOption = {
  id: string;
  label: string;
  description?: string;
};

type WizardOptionGridProps = {
  options: WizardOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
  columns?: "single" | "double" | "triple";
};

const columnClass = {
  single: "grid-cols-1",
  double: "grid-cols-1 sm:grid-cols-2",
  triple: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
} as const;

export function WizardOptionGrid({
  options,
  selectedId,
  onSelect,
  columns = "double",
}: WizardOptionGridProps) {
  return (
    <div className={cn("grid gap-3", columnClass[columns])}>
      {options.map((option) => {
        const isSelected = selectedId === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={cn(
              "surface-hover group rounded-sm p-5 text-left transition-all duration-300",
              "hover:border-brand-accent/35 hover:shadow-[var(--ambient-shadow)]",
              isSelected &&
                "border-brand-accent/40 bg-secondary/30 shadow-[var(--ambient-shadow-sm)]"
            )}
          >
            <span
              className={cn(
                "font-ui block text-[15px] font-medium leading-snug sm:text-base sm:leading-normal transition-colors",
                isSelected
                  ? "text-foreground"
                  : "text-foreground/95 group-hover:text-foreground"
              )}
            >
              {option.label}
            </span>
            {option.description && (
              <span className="font-ui mt-2 block text-sm leading-relaxed text-muted-foreground">
                {option.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
