import styles from "./MainContent.module.css";

export default function MainContent({
  children,
  className = "",
  style = undefined
}) {
  return (
    <main
      className={className ? `${styles.main} ${className}` : styles.main}
      style={style}>
      {children}
    </main>
  );
}
