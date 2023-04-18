import React from "react";
import styles from "./timeline.module.css";

export default function Timeline() {
  const hourDotElements = [];

  for (let i = 0; i < 34; i++) {
    hourDotElements.push(
      <span className="hourdot" key={i}>
        ·
      </span>
    );
  }

  return (
    <div className={`container ${styles.timeline}`}>
      <span className={styles.sun}>🌞</span>
      {hourDotElements}
      <span className={styles.moon}>🌛</span>
    </div>
  );
}
