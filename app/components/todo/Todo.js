import { React, useState, useEffect } from "react";
import styles from "./todo.module.css";

export default function Todo({ task, timer, handleTimer, setTaskData }) {
  // task.active && console.log(timer);
  // drive = streak = 4 * work session in a row

  const [counter, setCounter] = useState(0);
  const [active, setActive] = useState(false);
  const driveLimit = 4;

  function findTimeDelta(next, prev) {
    return prev ? Date.parse(next) - Date.parse(prev) : "No break";
  }

  console.log(task.sessions[task.sessions.length - 1]);
  // if (task.sessions.length > 1) {
  //   const deltas = task.sessions.map((session, index) => {
  //     return index != task.sessions.length - 1
  //       ? findTimeDelta(task.sessions[index + 1].start_date, session.end_date)
  //       : "last session is going on";
  //   });

  //   const bananaBreaks = deltas.map((delta, index) => {
  //     return delta < 5000 ? "banana" : "-";
  //   });
  //   console.log(bananaBreaks);
  // }

  function handleTaskClick(event) {
    // handleTimer(event);
    setActive(true);

    const currentSessionStart = Date();
    const prevSessionEnd =
      task.sessions.length > 1
        ? task.sessions[task.sessions.length - 1].end_date
        : null;

    const currentSession = {
      start_date: currentSessionStart,
      end_date: "Ongoing...",
      break: findTimeDelta(currentSessionStart, prevSessionEnd),
      shortBreak:
        findTimeDelta(currentSessionStart, prevSessionEnd) < 5000
          ? true
          : false,
    };

    //👇 this gets into the closure
    let intervalCounter = 0;
    const userValue = parseInt(document.getElementById("timerInput").value);
    const taskInterval = setInterval(() => {
      if (intervalCounter < userValue) {
        intervalCounter++;
        setCounter((prev) => prev + 1);
      } else {
        clearInterval(taskInterval);
        setActive(false);

        //👇  when finished update the session-end time
        setTaskData((prevTasks) => {
          let modifiedTasks = prevTasks.map(function (item) {
            if (item.id == task.id) {
              let currentSession = item.sessions[item.sessions.length - 1];
              currentSession.end_date = Date();
              return {
                ...item,
                active: false,
              };
            } else {
              return item;
            }
          });
          return modifiedTasks;
        });
      }
    }, 1000);

    setTaskData((prevTasks) => {
      let modifiedTasks = prevTasks.map(function (item) {
        return item.id == task.id
          ? {
              ...item,
              active: true,
              sessions: [...item.sessions, currentSession],
            }
          : {
              ...item,
              active: false,
            };
      });
      return modifiedTasks;
    });
  }

  const loadBarStyle = {
    width: task.active ? `${(counter / 25) * 100}%` : "100%",
    background: task.active ? "lightgreen" : "white",
    height: "3px",
  };

  // let bananas = task.sessions.map(() => "🍌");

  return (
    <div className={styles.taskItem} onClick={handleTaskClick}>
      <p className={styles.taskText}>{task.title}</p>
      <p className={styles.sessionInfo}></p>
      <p className={styles.stopWatch}>
        {task.active && "⏱️"} {counter}
      </p>
      {active}
      <p className="loadBar" style={{ ...loadBarStyle }}></p>
    </div>
  );
}
