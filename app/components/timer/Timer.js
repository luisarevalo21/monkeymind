"use client";

import React, { useState, useEffect } from "react";
import styles from "./timer.module.css";

function Timer({ timer, handleTimer, session }) {
  return (
    <div className={`container ${styles.timer}`}>
      <p className={styles.counter}>{timer}</p>
      <form className="timer-form">
        <p>Enter work period</p>
        <input
          type="text"
          placeholder="Work period"
          id="timerInput"
          className={styles.input}
        />
        {/* <label>
          Pick a time period:
          <select name="selectedFruit">
            <option value="25">25</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </label> */}
        <button className={`button ${styles.startBtn}`} onClick={handleTimer}>
          Start
        </button>
      </form>
      <div className={styles.sessionTable}>
        <p> Session Start : {session.startTime}</p>
        <p> Session End : {session.endTime}</p>
      </div>
    </div>
  );
}

export default Timer;
