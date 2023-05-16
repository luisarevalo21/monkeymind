import React from "react";
import styles from "./timeline.module.css";
import Link from "next/link";
import { getFontDefinitionFromNetwork } from "next/dist/server/font-utils";

export default function Timeline({ taskData }) {
  const timeLabels = [];
  const timeSlots = [];

  for (let i = 0; i < 25; i++) {
    i < 10 ? timeLabels.push("0" + i + ":00") : timeLabels.push(i + ":00");
    // halftimeLabels.push(i + ":30");
    timeSlots.push("·");
  }

  const allSessions = taskData.reduce((concatenated, item) => {
    return concatenated.concat(item.sessions);
  }, []);

  const endHours = allSessions.map((item) => {
    const fullDate = new Date(item.end_date);
    return Math.floor((fullDate.getSeconds() / 60) * 24);
  });

  const timeLabelElements = timeLabels.map((item, index) => (
    <p className={styles.timeLabel} key={index}>
      {item}
    </p>
  ));

  const timeSlotElements = timeSlots.map((item, index) => (
    <p className={styles.timeSlot} key={index}>
      {endHours.includes(index) ? "🍌" : item}
    </p>
  ));

  return (
    <div className={styles.component}>
      <nav className={styles.selectTimeScope}>
        <Link href="/#">Today</Link>
        <Link href="/#">Week</Link>
      </nav>

      <div className={`container ${styles.dailyScope}`}>
        <div className={styles.sun}>🛏️</div>
        <div className={styles.timeLabels}>{timeLabelElements}</div>
        <div className={styles.timeSlots}>{timeSlotElements}</div>
        <div className={styles.moon}>🌞</div>
      </div>
      {/* <div className={`container ${styles.dailyScope}`}>
        <div className={styles.sun}>🌞</div>
        <div className={styles.intervalContainer}>{halfHourElements}</div>
        <div className={styles.moon}>🌛</div>
      </div> */}
    </div>
  );
}
