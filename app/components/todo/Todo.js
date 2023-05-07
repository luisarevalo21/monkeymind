import { React, useState, useEffect } from "react";
import styles from "./todo.module.css";

export default function Todo({ task, timer, handleTimer, setTaskData }) {
  // task.active && console.log(timer);

  const [counter, setCounter] = useState(0);
  const [active, setActive] = useState(false);

  // updating the state out of setInterval doesn't work since
  // the value of count stays same as the initial value
  // this happens because of closure
  // https://itnext.io/how-to-work-with-intervals-in-react-hooks-f29892d650f2

  function handleTaskClick(event) {
    // handleTimer(event);

    //👇 this gets into the closure
    let intervalCounter = 0;
    const userValue = parseInt(document.getElementById("timerInput").value);

    const taskInterval = setInterval(() => {
      if (intervalCounter < userValue) {
        intervalCounter++;
        setCounter((prev) => prev + 1);
      } else {
        clearInterval(taskInterval);
        //👇  when finished update the session-end time
        setTaskData((prevTasks) => {
          let modifiedTasks = prevTasks.map(function (item) {
            if (item.id == task.id) {
              let date = new Date();
              let currentSession = item.sessions[item.sessions.length - 1];
              currentSession.end_time = date.toLocaleTimeString("en-US");

              return {
                ...item,
                active: false,
                sessions: [...item.sessions, { ...currentSession }],
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
        if (item.id == task.id) {
          let date = new Date();
          return {
            ...item,
            active: true,
            sessions: [
              ...item.sessions,
              {
                session_id: item.sessions.length++,
                start_time: date.toLocaleTimeString("en-US"),
              },
            ],
          };
        } else {
          return {
            ...item,
            active: false,
          };
        }
      });
      return modifiedTasks;
    });
  }

  const loadBarStyle = {
    width: task.active ? `${(timer / 25) * 100}%` : "100%",
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
      <p className="loadBar" style={{ ...loadBarStyle }}></p>
    </div>
  );
}
