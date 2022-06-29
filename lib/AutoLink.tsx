import Link from "next/link";
import { ComponentProps } from "react";

export function AutoLink({ children, href, ...props }: ComponentProps<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
    );
  }

  if (props.target == "_blank") {
    return (
      <a href={href} {...props} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
