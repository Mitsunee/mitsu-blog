import cc from "classcat";
import { ComponentProps } from "react";

export function Headline({
  children,
  className,
  ...props
}: ComponentProps<"h1">) {
  return (
    <h1 className={cc([className, "headline"])} {...props}>
      {children}
    </h1>
  );
}
