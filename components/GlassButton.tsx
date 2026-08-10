import styles from "./GlassButton.module.css";
import { cn } from "@/lib/utils";

type GlassButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
  external?: boolean;
};

export function GlassButton({
  children,
  href,
  onClick,
  className,
  ariaLabel,
  type = "button",
  external,
}: GlassButtonProps) {
  const classes = cn("glass", styles.button, className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <span className={styles.label}>{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className={styles.label}>{children}</span>
    </button>
  );
}
