import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
};

export function SectionHeader({
  label,
  title,
  description,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      <p className="section-label mb-6">{label}</p>
      <h2 className="max-w-3xl font-heading text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-[1.12] tracking-[-0.02em] text-foreground">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 max-w-xl text-base leading-[1.75] text-muted-foreground",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
