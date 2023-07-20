"use client";

import React from "react";
import styles from "./timerController.module.css";

export default function TimerController({
  timer,
  handleTimer,
  sessionDuration,
  setSessionDuration,
}) {
  function handleSelect(event) {
    setSessionDuration(event.target.value);
  }

  function handleTimerInput(event) {
    setSessionDuration(event.target.value);
  }

  return (
    <div className={`container ${styles.component}`}>
      <p>Set session period</p>
      <p className={styles.counter}>{timer}</p>
      <div className={styles.userInputs}>
        <form className={styles.enterDuration}>
          Custom
          <input
            type="number"
            placeholder="Work period"
            id="timerInput"
            className={styles.userInput}
            value={sessionDuration}
            onChange={handleTimerInput}
          />
        </form>
        <label className={styles.selectDuration}>
          Select
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
        </label>
      </div>
      <button onClick={handleTimer}>Start</button>
    </div>
  );
}
