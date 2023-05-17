import { React, useState, useEffect } from "react";
import styles from "./todo.module.scss";

export default function Todo({ task, timer, handleTimer, setTaskData }) {
  // task.active && console.log(timer);
  // drive = streak = 4 * work session in a row

  console.log(document.getElementsByClassName("taskItem::after"));
  const [counter, setCounter] = useState(0);
  const [active, setActive] = useState(false);
  const driveLimit = 4;

  function findTimeDelta(next, prev) {
    return prev ? next - prev : "First session";
  }

  function handleTaskClick(event) {
    // handleTimer(event);

    setActive(true);

    const currentSessionStart = Date.now();
    const prevSessionEnd =
      task.sessions.length > 0
        ? task.sessions[task.sessions.length - 1].end_date
        : null;

    const delta = findTimeDelta(currentSessionStart, prevSessionEnd);

    const currentSession = {
      start_date: currentSessionStart,
      end_date: "ongoing session...",
      prev_break: delta,
      prev_break_short: delta < 5000 ? true : false,
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
              currentSession.end_date = Date.now();
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
    height: "1px",
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
