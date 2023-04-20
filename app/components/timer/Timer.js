"use client";

import React, { useState, useEffect } from "react";
import styles from "./timer.module.css";

function Timer({ timer, handleStart, session }) {
  console.log(timer);
  // const sessionPeriods = [25, 30, 40, 50];
  // const [timer, setTimer] = useState(0);
  // const [session, setSession] = useState({
  //   startTime: "start",
  //   finishTime: "finish",
  // });

  // function handleStart(event) {
  //   event.preventDefault();
  //   let date = new Date();

  //   setSession((prev) => ({
  //     ...prev,
  //     startTime: date.toTimeString(),
  //   }));

  //   let userValue = document.getElementById("timerInput").value;

  //   let interval = setInterval(function () {
  //     if (userValue > 0) {
  //       userValue--;
  //       setTimer((prev) => prev + 1);
  //     } else {
  //       clearInterval(interval);
  //       let date = new Date();
  //       setSession((prev) => ({
  //         ...prev,
  //         finishTime: date.toTimeString(),
  //       }));
  //     }
  //   }, 1000);
  // }

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

export default Timer;
