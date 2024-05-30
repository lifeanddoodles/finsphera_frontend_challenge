import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./Button.types";
import { getButtonClasses } from "./utils";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  id,
  ariaLabel,
  variant = "solid",
  color = "primary",
  className,
}: ButtonProps) => {
  const classes = twMerge(getButtonClasses(variant, color), className);

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
