export type ButtonColor = "accent" | "primary" | "secondary";

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";

export type ButtonSize = "small" | "normal" | "large" | "x-large";

export type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.PointerEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  className?: string;
};
