"use client";

import { React, useState } from "react";
import styles from "./timer.module.css";

function Timer({ timer, handleTimer }) {
  const [sessionDuration, setSessionDuration] = useState("Select");

  function handleSelect(event) {
    setSessionDuration(event.target.value);
  }
  return (
    <div className={`container ${styles.component}`}>
      <p className={styles.counter}>{timer}</p>
      <p>Enter session duration or select</p>
      <div className={styles.userInputs}>
        <form className={styles.enterDuration}>
          <input
            type="number"
            placeholder="Work period"
            id="timerInput"
            className={styles.userInput}
          />
        </form>
        <label className={styles.selectDuration}>
          <select
            className={styles.dropdown}
            id="sessionDuration"
            name="sessionDuration"
            value={sessionDuration}
            onChange={handleSelect}
          >
            <option value="">Select</option>
            <option value="25">25</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>
      <button className={`button ${styles.startBtn}`} onClick={handleTimer}>
        Start
      </button>
    </div>
  );
}

export default Timer;
