import React from "react";
import styles from "./timeline.module.scss";
import Link from "next/link";
import { getFontDefinitionFromNetwork } from "next/dist/server/font-utils";

export default function Timeline({ taskData }) {
  const morningTimes = [];
  const noonTimes = [];
  let nightTimes = [];
  const earlyNightTimes = [];
  const lateNightTimes = [];
  let sunPhases = {};
  const thirtyMins = 30 * 60 * 1000;
  const threeHours = 3 * 60 * 60 * 1000;
  const sixHours = 2 * threeHours;
  const wholeDay = 8 * threeHours;
  const dayStart = 4;

  // fetch("https://api.sunrise-sunset.org/json")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

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

  for (let i = 0; i < 24; i++) {
    if (i >= 0 && i < 4) {
      lateNightTimes.push(i + ":00", i + ":30");
    } else if (i >= 4 && i < 12) {
      i < 10
        ? morningTimes.push("0" + i + ":00", "0" + i + ":30")
        : morningTimes.push(i + ":00", i + ":30");
      // i == 12 ? morningTimeSlots.push("·") : morningTimeSlots.push("·", "·");
    } else if (i >= 12 && i < 20) {
      noonTimes.push(i + ":00", i + ":30");
      // afternoonTimeSlots.push("·", "·");
    } else if (i >= 20 && i < 24) {
      earlyNightTimes.push(i + ":00", i + ":30");
    }
    nightTimes = earlyNightTimes.concat(lateNightTimes);
  }

  const allDayTimes = [...morningTimes, ...noonTimes, ...nightTimes];

  const morningLabels = generateLabels(morningTimes);
  const noonLabels = generateLabels(noonTimes);
  const nightLabels = generateLabels(nightTimes);

  const morningSlots = generateSlots(morningTimes);
  const noonSlots = generateSlots(noonTimes);
  const nightSlots = generateSlots(nightTimes);

  // let timeLabels = allDayTimes.map((item, index) => (
  //   <p className={styles.timeLabel} key={index}>
  //     {item}
  //   </p>
  // ));

  // let timeSlots = allDayTimes.map((item, index) => (
  //   <p className={styles.timeSlot} key={index}></p>
  // ));

  const allSessions = taskData.reduce((acc, curr) => {
    return acc.concat(curr.sessions);
  }, []);

  const previousSessionLabels = allSessions.map((item) => {
    let startDate = new Date(item.start_date);
    let endDate = new Date(item.end_date);

    return [
      startDate.getHours() + ":" + startDate.getMinutes(),
      endDate.getHours() + ":" + startDate.getMinutes(),
    ];
  });

  const endDates = allSessions.map((item) => {
    const fullDate = new Date(item.end_date);

    return Math.floor((fullDate.getHours() / 60) * 24);
  });

  // const allDaySlots = allDayTimes.map((item, index) => (
  //   <p className={styles.timeSlot} key={index}></p>
  // ));

  return (
    <div className={styles.component}>
      <nav className={styles.selectTimeScope}>
        <Link href="/#">🛏️</Link>
        <Link href="/#">🌞</Link>
        <Link href="/#">🌛</Link>
      </nav>
      <div className={`container ${styles.dailyScope}`}>
        <div className={styles.morningTimes}>
          <div className={styles.timeLabels}>{morningLabels}</div>
          <div className={styles.timeSlots}>{morningSlots}</div>
        </div>
        <div className={styles.noonTimes}>
          <div className={styles.timeLabels}>{noonLabels}</div>
          <div className={styles.timeSlots}>{noonSlots}</div>
        </div>
        <div className={styles.nightTimes}>
          <div className={styles.timeLabels}>{nightLabels}</div>
          <div className={styles.timeSlots}>{nightSlots}</div>
        </div>
      </div>

      {/* <div className={`container ${styles.dailyScope}`}>
        <div className={styles.timeLabels}>{timeLabels}</div>
        <div className={styles.timeSlots}>{timeSlots}</div>
      </div> */}
    </div>
  );
}
