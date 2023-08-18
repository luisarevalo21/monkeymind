"use client";
import React, { useEffect, useRef } from "react";
import Session from "./Session.js";
import styles from "./timeline.module.scss";
import { calculateTimeLabels } from "./timelineHelpers";

export default function Timeline({ taskData, cloudTasks, scrollCoordinate }) {
  const { morningTimes, noonTimes, nightTimes } = calculateTimeLabels();
  const morningLabels = generateLabels(morningTimes);
  const noonLabels = generateLabels(noonTimes);
  const nightLabels = generateLabels(nightTimes);
  const morningSlots = generateSlots(morningTimes);
  const noonSlots = generateSlots(noonTimes);
  const nightSlots = generateSlots(nightTimes);
  const timelineRef = useRef(null);
  const widthRatioPerMiliSeconds = 1 / 24 / 60 / 60 / 1000;
  const four_am = new Date().setHours(4, 0, 0, 0);

  useEffect(() => {
    // INITIAL SCROLL
    // width of timeline in pixels
    const scrollWidth = timelineRef.current.scrollWidth;
    const now = Date.now();
    const x_coordinate = calculateCoordinate(now, four_am);

    timelineRef.current.scroll({
      left: x_coordinate * scrollWidth - 100,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const scrollWidth = timelineRef.current.scrollWidth;
    timelineRef.current.scroll({
      left: scrollCoordinate * scrollWidth - 100,
      behavior: "smooth",
    });
  }, [scrollCoordinate]);

  function calculateCoordinate(now, origin) {
    return (now - origin) * widthRatioPerMiliSeconds;
  }

  const allLocalSessions = taskData.reduce((acc, curr) => {
    if (curr.sessions !== []) {
      const todaysSessions = curr.sessions.filter(
        (session) => session.start_date > four_am
      );
      return acc.concat(todaysSessions);
    }
  }, []);

  const allCloudSessions = cloudTasks.reduce((acc, curr) => {
    if (curr.sessions !== []) {
      return acc.concat(curr.sessions);
    }
  }, []);

  const allSessions = allLocalSessions.concat(allCloudSessions);

  function scrollToSession() {
    timelineRef.current &&
      timelineRef.current.scroll({
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
      <div className={`container ${styles.dailyScope}`} ref={timelineRef}>
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
