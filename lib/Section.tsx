import cc from "classcat";
import { ComponentProps, PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<
  Omit<ComponentProps<"section">, "className"> & {
    className?: string | string[];
  }
>;

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cc([className, "content-section"])} {...props}>
      {children}
    </section>
  );
}

export function Columns({ children }: PropsWithChildren) {
  return <div className={"content-columns"}>{children}</div>;
}
