import Link from "next/link";

interface AutoLinkProps extends React.ComponentPropsWithRef<"a"> {
  href: string;
}

export function AutoLink({ children, href, ...props }: AutoLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
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
