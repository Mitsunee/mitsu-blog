import cc from "classcat";
import { ComponentProps } from "react";

export function Section({
  children,
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cc([className, "content-section"])} {...props}>
      {children}
    </section>
  );
}

export function Columns({ children }: ComponentProps<"div">) {
  return <div className={"content-columns"}>{children}</div>;
}
