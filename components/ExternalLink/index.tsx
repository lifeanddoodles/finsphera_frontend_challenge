import React from "react";
import { twMerge } from "tailwind-merge";

const ExternalLink = ({
  children,
  href,
  className,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  const classes = twMerge(
    "flex place-items-center gap-2 text-primary hover:text-primary-dark dark:text-neutral-100 dark:hover:text-white",
    className
  );
  return (
    <a
      className={classes}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
