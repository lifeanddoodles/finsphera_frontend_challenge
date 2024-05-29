import React from "react";

const ExternalLink = ({
  children,
  href,
  ...props
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <a
      className="flex place-items-center gap-2"
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
