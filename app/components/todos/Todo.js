import { React, useState, useEffect } from "react";
import styles from "./todos.module.css";

export default function Todo({ task, timer, index, handleTimer, setTaskData }) {
  const [active, setActive] = useState(false);

  function handleTaskClick(event) {
    handleTimer(event);
    const currentTaskIndex = index;
    // event.target.className == styles.taskItem
    //   ? event.target.getAttribute("index")
    //   : event.target.parentElement.getAttribute("index");

    setTaskData((prevTasks) => {
      let modifiedTasks = prevTasks.map(function (item, index) {
        if (currentTaskIndex == index) {
          let date = new Date();
          return {
            ...item,
            active: true,
            sessions: [
              ...item.sessions,
              {
                session_id: item.sessions.length++,
                start_time: date.toLocaleTimeString("en-US"),
                end_time: "-",
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

  let loadingStyle = {
    width: `${task.active && (timer / 25) * 100}%`,
    background: "lightgreen",
    height: "2px",
  };

  return (
    <div className={styles.taskItem} index={index} onClick={handleTaskClick}>
      <p className={styles.taskText}>{task.title}</p>
      <p className={styles.stopWatch}>{task.active && "⏱️"} </p>
      <div className="loadBar"></div>

      {/* style jsx is next.js feature */}
      <style jsx>
        {`
          .loadBar {
            width: ${task.active && timer > 0 ? (timer / 25) * 100 : 0}%;
            background: lightgreen;
            height: 2px;
            grid-area: loadBar;
            transition: width 0.2s ease-in-out;
          }
        `}
      </style>
      {/* <p className={styles.deleteBtn}>❌</p> */}
    </div>
  );
}
