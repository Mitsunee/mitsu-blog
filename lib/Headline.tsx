import cc from "classcat";
import { PropsWithChildren, ComponentProps } from "react";

type HeadlineProps = PropsWithChildren<
  Omit<ComponentProps<"h1">, "className"> & {
    className?: string | string[];
  }
>;

export function Headline({ children, className, ...props }: HeadlineProps) {
  return (
    <h1 className={cc([className, "headline"])} {...props}>
      {children}
    </h1>
  );
}
