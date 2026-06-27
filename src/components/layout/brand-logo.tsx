import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export const BRAND_LOGO_PATH = "/brand/agm-logo.png";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  /** Render as static image without home link (e.g. footer) */
  linked?: boolean;
};

export function BrandLogo({
  className,
  imageClassName,
  priority = false,
  linked = true,
}: BrandLogoProps) {
  const image = (
    <Image
      src={BRAND_LOGO_PATH}
      alt="AGM Core Tech"
      width={512}
      height={464}
      priority={priority}
      className={cn("h-9 w-auto object-contain sm:h-10", imageClassName)}
    />
  );

  if (!linked) {
    return <span className={cn("inline-flex shrink-0", className)}>{image}</span>;
  }

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center transition-opacity hover:opacity-90", className)}
      aria-label="AGM Core Tech"
    >
      {image}
    </Link>
  );
}
