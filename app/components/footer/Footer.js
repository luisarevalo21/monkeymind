import React from "react";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.component}>
      <div className={styles.container}>
        <div>
          <h3 className={styles.logo}>Monkey Mind</h3>
          <h5>@2023</h5>
          <h5>Development Beta</h5>
        </div>
        <div className={styles.heiku}>
          <h4>A haiku</h4>
          <p>Do not fight</p>
          <p>the monkeymind</p>
          <p>catch the tide</p>
        </div>
      </div>
    </footer>
  );
}
