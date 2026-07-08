import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  full?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  full = false,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    size === "sm" ? styles.sm : "",
    full ? styles.full : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} {...rest} />;
}
