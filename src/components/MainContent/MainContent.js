import styles from "./MainContent.module.css";

export default function MainContent({ children, className, ...props }) {
  return (
    <main
      className={className ? `${styles.main} ${className}` : styles.main}
      {...props}>
      {children}
    </main>
  );
}
