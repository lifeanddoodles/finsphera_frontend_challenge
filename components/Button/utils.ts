import { ButtonColor, ButtonVariant } from "./Button.types";

function getTextColor(variant: ButtonVariant, color: ButtonColor) {
  if (variant === "solid") {
    return "text-white";
  }

  const disabledClasses = "disabled:text-gray-700";

  switch (color) {
    case "primary":
      return `text-primary hover:text-primary-dark ${disabledClasses}`;
    case "secondary":
      return `text-secondary hover:text-secondary-dark ${disabledClasses}`;
    case "accent":
      return `text-accent hover:text-accent-dark ${disabledClasses}`;
    default:
      return "";
  }
}

function getBackgroundColor(variant: ButtonVariant, color: ButtonColor) {
  if (variant === "link" || variant === "outline" || variant === "ghost") {
    const hoverClasses =
      variant === "link"
        ? "hover:underline"
        : "hover:bg-neutral-200 dark:hover:bg-neutral-800";
    return `bg-transparent ${hoverClasses}`;
  }

  const disabledClasses = "disabled:bg-gray-400";

  switch (color) {
    case "primary":
      return `bg-primary hover:bg-primary-dark ${disabledClasses}`;
    case "secondary":
      return `bg-secondary hover:bg-secondary-dark ${disabledClasses}`;
    case "accent":
      return `bg-accent hover:bg-accent-dark ${disabledClasses}`;
    default:
      return "";
  }
}

export function getColorClasses(variant: ButtonVariant, color: ButtonColor) {
  switch (variant) {
    default:
      return `${getTextColor(variant, color)} ${getBackgroundColor(
        variant,
        color
      )}`;
  }
}

function getBorderClasses(variant: ButtonVariant, color: ButtonColor) {
  if (variant !== "outline") {
    return "border-0";
  }

  const baseBorderClasses = "border-2";

  switch (color) {
    case "primary":
      return `${baseBorderClasses} border-primary hover:border-primary-dark`;
    case "secondary":
      return `${baseBorderClasses} border-secondary hover:border-secondary-dark`;
    case "accent":
      return `${baseBorderClasses} border-accent hover:border-accent-dark`;
    default:
      return "";
  }
}

export function getButtonClasses(variant: ButtonVariant, color: ButtonColor) {
  const spacingClasses = variant === "link" ? "" : "rounded-lg py-1 px-3";
  const baseClasses = `text-base ${spacingClasses} mb-4`;

  switch (variant) {
    default:
      return `${baseClasses} ${getBorderClasses(
        variant,
        color
      )} ${getColorClasses(variant, color)}`;
  }
}
