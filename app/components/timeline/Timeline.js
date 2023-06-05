import React from "react";
import styles from "./timeline.module.scss";
import Link from "next/link";
import { getFontDefinitionFromNetwork } from "next/dist/server/font-utils";
import { calculateTimes } from "./timelineHelpers";

export default function Timeline({ taskData }) {
  const { morningTimes, noonTimes, nightTimes, widthPerMinute } =
    calculateTimes();

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

  const morningLabels = generateLabels(morningTimes);
  const noonLabels = generateLabels(noonTimes);
  const nightLabels = generateLabels(nightTimes);

  const morningSlots = generateSlots(morningTimes);
  const noonSlots = generateSlots(noonTimes);
  const nightSlots = generateSlots(nightTimes);

  const allSessions = taskData.reduce((acc, curr) => {
    return acc.concat(curr.sessions);
  }, []);

  const pastSessionElements = allSessions.map((item, index) => {
    let now = new Date();
    let fourInTheMorning = now.setHours(4, 0, 0, 0);

    console.log(now, item.start_date);
    console.log("delta: ", item.start_date - fourInTheMorning);

    let left =
      ((item.start_date - fourInTheMorning) / 1000 / 60) * widthPerMinute;

    let width = (item.duration / 1000 / 60) * widthPerMinute;

    console.log("item duration:", item.duration);
    console.log("width percentage", width);

    console.table([item.duration, left, width]);
    // it should return an array of elements defining the
    // x coordinate of the completed task,
    // the origin is the beginning of timeSlots

    let style = {
      left: `${left}%`,
      width: `${width}%`,
    };

    return (
      <div className={styles.pastSession} key={index} style={style}>
        {item.task_id}
      </div>
    );
  });

  console.log("all sessions", allSessions);

  // const allDaySlots = allDayTimes.map((item, index) => (
  //   <p className={styles.timeSlot} key={index}></p>
  // ));

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
