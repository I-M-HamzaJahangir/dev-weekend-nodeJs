import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrap}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.desc}>The page you're looking for doesn't exist or has moved.</p>
      <div className={styles.action}>
        <Button onClick={() => navigate("/")}>Back to home</Button>
      </div>
    </div>
  );
}
