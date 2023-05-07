import { useEffect } from "react";
import React from "react";
import styles from "./timeline.module.css";

export default function Timeline() {
  const hourIntervals = [];

  for (let i = 0; i < 25; i++) {
    i < 10
      ? hourIntervals.push("0" + i + ":00")
      : hourIntervals.push(i + ":00");
    // halfHourIntervals.push(i + ":30");
  }

  const halfHourElements = hourIntervals.map((item, index) => {
    return (
      <div className={styles.intervalSlot} key={index}>
        <p className={styles.intervalHour}>{item}</p>
        <p className={styles.dots}>·</p>
      </div>
    );
  });

  return (
    <div>
      <p>Your day</p>
      <div className={`container ${styles.component}`}>
        <div className={styles.sun}>🌞</div>
        <div className={styles.intervalContainer}>{halfHourElements}</div>
        <div className={styles.moon}>🌛</div>
      </div>
    </div>
  );
}
