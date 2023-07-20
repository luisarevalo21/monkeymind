"use client";
import React, { useEffect, useRef } from "react";
import Session from "./Session.js";
import styles from "./timeline.module.scss";
import { calculateTimeLabels } from "./timelineHelpers";

export default function Timeline({ taskData, scrollCoordinate }) {
  const { morningTimes, noonTimes, nightTimes } = calculateTimeLabels();
  const morningLabels = generateLabels(morningTimes);
  const noonLabels = generateLabels(noonTimes);
  const nightLabels = generateLabels(nightTimes);
  const morningSlots = generateSlots(morningTimes);
  const noonSlots = generateSlots(noonTimes);
  const nightSlots = generateSlots(nightTimes);

  const timelineScope = useRef(null);
  const currentSession = useRef(null);

  const allSessions = taskData.reduce((acc, curr) => {
    if (curr.sessions !== []) {
      return acc.concat(curr.sessions);
    }
  }, []);

  if (timelineScope.current) {
    const scrollWidth = timelineScope.current.scrollWidth;
    const scrollUnit = scrollWidth / 100;
    timelineScope.current.scroll({
      left: scrollCoordinate * scrollUnit - 50,
      behavior: "smooth",
    });
  }

  function scrollToSession() {
    timelineScope.current &&
      timelineScope.current.scroll({
        left: scrollCoordinate,
        behavior: "smooth",
      });
  }

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

  const sessionElements = allSessions.map((item, index) => {
    return <Session session={item} key={index} />;
  });

  return (
    <div className={styles.component}>
      <nav className={styles.selectTimeScope}>
        <a onClick={scrollToSession}>🛏️</a>
        <a onClick={scrollToSession}>🌞</a>
        <a onClick={scrollToSession}>🌛</a>
      </nav>
      <div className={`container ${styles.dailyScope}`} ref={timelineScope}>
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
        {sessionElements !== [] && (
          <div className={styles.sessions}>{sessionElements}</div>
        )}
      </div>
    </div>
  );
}
