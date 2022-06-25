import cc from "classcat";

export function Section({ children, className, ...props }) {
  return (
    <section className={cc([className, "content-section"])} {...props}>
      {children}
    </section>
  );
}

export function Columns({ children }) {
  return <div className={"content-columns"}>{children}</div>;
}
