import React from "react";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer>
      <h5 className={styles.logo}>Monkey Mind</h5>
      <p>@2023</p>
      <div className={styles.heiku}>
        <h5>Your daily haiku</h5>
        <p>Do not fight</p>
        <p>the monkeymind</p>
        <p>catch the tide</p>
      </div>
    </footer>
  );
}
