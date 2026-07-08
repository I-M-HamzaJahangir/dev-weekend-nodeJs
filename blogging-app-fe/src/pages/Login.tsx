import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../types";
import Button from "../components/Button";
import Field from "../components/Field";
import styles from "./Auth.module.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as { from?: string })?.from ?? "/";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof ApiError && err.fieldErrors.length) {
        const map: Record<string, string> = {};
        err.fieldErrors.forEach((f) => {
          map[f.field] = f.message ?? f.msg ?? "Invalid value";
        });
        setFieldErrors(map);
      } else {
        setFormError(err instanceof ApiError ? err.message : "Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Welcome back</p>
        <h1 className={styles.title}>Log in</h1>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {formError && <div className={styles.formError}>{formError}</div>}

          <Field
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
            required
          />
          <Field
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            required
          />

          <Button type="submit" full disabled={isSubmitting} className={styles.submit}>
            {isSubmitting ? "Logging in…" : "Log in"}
          </Button>
        </form>

        <p className={styles.switch}>
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
