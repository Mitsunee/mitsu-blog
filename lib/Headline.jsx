import cc from "classcat";

export function Headline({ children, className, ...props }) {
  return (
    <h1 className={cc([className, "headline"])} {...props}>
      {children}
    </h1>
  );
}
