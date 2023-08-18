"use client";

import React, { useRef, useEffect } from "react";
import styles from "./timerController.module.scss";

export default function TimerController({
  timer,
  handleTimer,
  sessionDuration,
  setSessionDuration,
  minutes,
}) {
  function handleSelect(event) {
    setSessionDuration(event.target.value);
  }

  function handleTimerInput(event) {
    setSessionDuration(event.target.value);
  }

  return (
    <div className={styles.component}>
      <div className={styles.counter}>
        <span className={styles.minutes}>
          {minutes.toString().padStart(2, "0")}
        </span>
        :
        <span className={styles.seconds}>
          {timer.toString().padStart(2, "0")}
        </span>
      </div>
      <div className={styles.userInputs}>
        <input
          type="number"
          placeholder="Type session period"
          id="timerInput"
          className={styles.customInput}
          value={sessionDuration}
          onChange={handleTimerInput}
        />
        <select
          className={styles.dropdown}
          id="sessionDuration"
          name="sessionDuration"
          onChange={handleSelect}
          value={sessionDuration}
        >
          <option value="25">25</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
      <button className={styles.startBtn} onClick={handleTimer}>
        Start
      </button>
    </div>
  );
}
