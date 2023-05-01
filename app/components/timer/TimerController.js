"use client";

import React from "react";
import styles from "./timer.module.css";

function Timer({ timer, handleTimer }) {
  return (
    <div className={`container ${styles.timer}`}>
      <p className={styles.counter}>{timer}</p>
      <form className="timer-form">
        <p>Enter work period</p>
        <input
          type="number"
          placeholder="Work period"
          id="timerInput"
          className={styles.input}
        />
        <button className={`button ${styles.startBtn}`} onClick={handleTimer}>
          Start
        </button>

        <label>
          Pick a time period:
          <select id="sessionPeriod " name="sessionPeriod">
            <option value="25">25</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </label>
      </form>
    </div>
  );
}

export default Timer;
