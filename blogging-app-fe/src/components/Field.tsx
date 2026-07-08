import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./Field.module.css";

interface BaseProps {
  label: string;
  error?: string;
}

type InputFieldProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { as?: "input" };

type TextareaFieldProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

export default function Field(props: InputFieldProps | TextareaFieldProps) {
  const { label, error, id, as = "input", ...rest } = props;
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={fieldId}
          className={styles.textarea}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={fieldId}
          className={styles.input}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
