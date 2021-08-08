import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <h1>Loading</h1>
      <div className={styles.spinner}></div>
    </div>
  );
}
