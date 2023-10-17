import styles from "./primary-input-style.module.css";
import { ChangeEvent, FC } from "react";

interface PrimaryInputProps {
  width?: string;
  name: string;
  placeholder: string;
  label: string;
  type: "text" | "number" | "email";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}

export const PrimaryInput: FC<PrimaryInputProps> = ({
  width,
  placeholder,
  label,
  type,
  value,
  name,
  onChange,
  error,
}) => {
  return (
    <div style={{ width }} className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p className={error ? styles.errorMessageShow : styles.errorMessageHide}>
        {error}
      </p>
    </div>
  );
};
