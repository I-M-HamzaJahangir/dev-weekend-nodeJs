import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.brand}>Marginalia</span>
        <span>Notes worth keeping.</span>
      </div>
    </footer>
  );
}
