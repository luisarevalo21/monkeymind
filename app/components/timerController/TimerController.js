"use client";

import { React, useState } from "react";
import styles from "./timer.module.css";

function Timer({ timer, handleTimer }) {
  const [sessionDuration, setSessionDuration] = useState("25");

  function handleSelect(event) {
    console.log(event.target);
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

export default Timer;
