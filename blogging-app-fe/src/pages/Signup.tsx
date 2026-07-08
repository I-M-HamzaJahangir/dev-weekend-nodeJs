import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { ApiError } from "../types";
import Button from "../components/Button";
import Field from "../components/Field";
import styles from "./Auth.module.css";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", name: "", email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      await signup(form);
      navigate("/login", { state: { from: "/" } });
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
        <p className={styles.eyebrow}>Join Marginalia</p>
        <h1 className={styles.title}>Create an account</h1>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {formError && <div className={styles.formError}>{formError}</div>}

          <Field
            label="Name"
            value={form.name}
            onChange={update("name")}
            error={fieldErrors.name}
            required
          />
          <Field
            label="Username"
            value={form.username}
            onChange={update("username")}
            error={fieldErrors.username}
            required
          />
          <Field
            label="Email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            error={fieldErrors.email}
            required
          />
          <Field
            label="Password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={update("password")}
            error={fieldErrors.password}
            required
          />

          <Button type="submit" full disabled={isSubmitting} className={styles.submit}>
            {isSubmitting ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className={styles.switch}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
