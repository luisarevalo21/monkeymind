import React from "react";
import styles from "./timeline.module.scss";
import Link from "next/link";
import { getFontDefinitionFromNetwork } from "next/dist/server/font-utils";

export default function Timeline({ taskData }) {
  const morningTimeLabels = [];
  const afternoonTimeLabels = [];
  const morningTimeSlots = [];
  const afternoonTimeSlots = [];

  for (let i = 5; i < 13; i++) {
    i < 10
      ? morningTimeLabels.push("0" + i + ":00", "0" + i + ":30")
      : morningTimeLabels.push(i + ":00", i + ":30");
    // halftimeLabels.push(i + ":30");
    morningTimeSlots.push("·", "·");
  }

  console.log(morningTimeSlots);
  for (let i = 13; i < 19; i++) {
    afternoonTimeLabels.push(i + ":00", i + ":30");
    // halftimeLabels.push(i + ":30");
    afternoonTimeSlots.push("·", ".");
  }

  const allSessions = taskData.reduce((concatenated, item) => {
    return concatenated.concat(item.sessions);
  }, []);

  const endDates = allSessions.map((item) => {
    const fullDate = new Date(item.end_date);
    return Math.floor((fullDate.getSeconds() / 60) * 24);
  });

  const morningTimeLabelElements = morningTimeLabels.map((item, index) => (
    <p className={styles.timeLabel} key={index}>
      {item}
    </p>
  ));

  const morningTimeSlotElements = morningTimeSlots.map((item, index) => (
    <p className={styles.timeSlot} key={index}>
      {endDates.includes(index + 5) ? "🍌" : item}
    </p>
  ));

  const afternoonTimeLabelElements = afternoonTimeLabels.map((item, index) => (
    <p className={styles.timeLabel} key={index}>
      {item}
    </p>
  ));

  const afternoonTimeSlotElements = afternoonTimeSlots.map((item, index) => (
    <p className={styles.timeSlot} key={index}>
      {endDates.includes(index) ? "🍌" : item}
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
        <div className={styles.timeLabels}>{morningTimeLabelElements}</div>
        <div className={styles.timeSlots}>{morningTimeSlotElements}</div>
        <div className={styles.moon}>🌞</div>
      </div>
      {/* <div className={`container ${styles.dailyScope}`}>
        <div className={styles.sun}>🌞</div>
        <div className={styles.timeLabels}>{afternoonTimeLabelElements}</div>
        <div className={styles.timeSlots}>{afternoonTimeSlotElements}</div>
        <div className={styles.moon}>🌛</div>
      </div> */}
    </div>
  );
}
