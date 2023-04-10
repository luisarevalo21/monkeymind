"use client";

import React, { useState, useEffect } from "react";
import styles from "./timer.module.css";

function TimerControl() {
  const [timer, setTimer] = useState(0);
  const [session, setSession] = useState({
    startTime: "start",
    finishTime: "finish",
  });

  function handleStart(event) {
    event.preventDefault();
    let date = new Date();

    setSession((prev) => ({
      ...prev,
      startTime: date.toTimeString(),
    }));

    let userValue = document.getElementById(styles.input).value;

    let interval = setInterval(function () {
      if (userValue > 0) {
        userValue--;
        setTimer((prev) => prev + 1);
      } else {
        clearInterval(interval);
        let date = new Date();
        setSession((prev) => ({
          ...prev,
          finishTime: date.toTimeString(),
        }));
      }
    }, 1000);
  }

  return (
    <div className={`container ${styles.timer}`}>
      <p className={styles.counter}>{timer}</p>
      <form className="timer-form">
        Enter work period
        <input
          type="text"
          placeholder="Work period"
          id={styles.input}
          className={styles.input}
        />
        <button className={`button ${styles.startBtn}`} onClick={handleStart}>
          Start
        </button>
      </form>
      <div className={styles.sessionTable}>
        <p> Session Start : {session.startTime}</p>
        <p> Session End : {session.finishTime}</p>
      </div>
    </div>
  );
}

export default TimerControl;
