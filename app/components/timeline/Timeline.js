import { useEffect } from "react";
import React from "react";
import styles from "./timeline.module.css";
import Link from "next/link";

export default function Timeline({ taskData }) {
  const hourIntervals = [];

  const sessionEnds = taskData.map((item) => {
    return item.sessions.map((session) => session.end_time);
  });

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
    <div className={styles.component}>
      <nav className={styles.selectTimeScope}>
        <Link href="/#">Day</Link>
        <Link href="/#">Week</Link>
      </nav>

      <div className={`container ${styles.dailyScope}`}>
        <div className={styles.sun}>🌞</div>
        <div className={styles.intervalContainer}>{halfHourElements}</div>
        <div className={styles.moon}>🌛</div>
      </div>
    </div>
  );
}
