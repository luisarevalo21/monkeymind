"use client";

import React from "react";
import Session from "./Session.js";
import styles from "./timeline.module.scss";
import Link from "next/link";
import { getFontDefinitionFromNetwork } from "next/dist/server/font-utils";
import { calculateTimeLabels } from "./timelineHelpers";

export default function Timeline({ taskData, timer }) {
  const { morningTimes, noonTimes, nightTimes } = calculateTimeLabels();
  const morningLabels = generateLabels(morningTimes);
  const noonLabels = generateLabels(noonTimes);
  const nightLabels = generateLabels(nightTimes);

  const morningSlots = generateSlots(morningTimes);
  const noonSlots = generateSlots(noonTimes);
  const nightSlots = generateSlots(nightTimes);

  function generateLabels(arr) {
    return arr.map((item, index) => (
      <p className={styles.timeLabel} key={index}>
        {item}
      </p>
    ));
  }
  function generateSlots(arr) {
    return arr.map((item, index) => (
      <p className={styles.timeSlot} key={index}></p>
    ));
  }

  const allSessions = taskData.reduce((acc, curr) => {
    if (curr.sessions !== []) {
      return acc.concat(curr.sessions);
    }
  }, []);
  console.log(allSessions);
  const pastSessionElements = allSessions.map((item, index) => {
    return <Session session={item} key={index} />;
  });

  return (
    <div className={styles.component}>
      <nav className={styles.selectTimeScope}>
        <a href="#morning">🛏️</a>
        <a href="#noon">🌞</a>
        <a href="#night">🌛</a>
      </nav>
      <div className={`container ${styles.dailyScope}`} id="dailyScope">
        <div className={styles.morningTimes} id="morning">
          <div className={styles.timeLabels}>{morningLabels}</div>
          <div className={styles.timeSlots}>{morningSlots}</div>
        </div>
        <div className={styles.noonTimes} id="noon">
          <div className={styles.timeLabels}>{noonLabels}</div>
          <div className={styles.timeSlots}>{noonSlots}</div>
        </div>
        <div className={styles.nightTimes} id="night">
          <div className={styles.timeLabels}>{nightLabels}</div>
          <div className={styles.timeSlots}>{nightSlots}</div>
        </div>
        {pastSessionElements !== [] && (
          <div className={styles.sessions}>{pastSessionElements}</div>
        )}
      </div>
    </div>
  );
}
