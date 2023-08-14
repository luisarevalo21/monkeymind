import React from "react";
import styles from "./TextInputWithDropdown.module.scss";

export default function TextInputWithDropdown({ children }) {
  return (
    <div className={styles.container}>
      <input>{children}</input>
      {children}
    </div>
  );
}
