import styles from "./Spinner.module.css";

export default function Spinner({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <div className={`${styles.wrap} ${fullPage ? styles.fullPage : ""}`}>
      <div className={styles.spinner} role="status" aria-label="Loading" />
    </div>
  );
}
