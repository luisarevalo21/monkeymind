import { React, useState, useEffect } from "react";
import styles from "./todos.module.css";

export default function Todo({ task, timer, index, handleTimer, setTaskData }) {
  function handleTaskClick(event) {
    handleTimer(event);
    setTaskData((prevTasks) => {
      let modifiedTasks = prevTasks.map(function (item, mapIndex) {
        if (index == mapIndex) {
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

  const loadBarStyle = {
    width: task.active ? `${(timer / 25) * 100}%` : "100%",
    background: task.active ? "lightgreen" : "white",
    height: "3px",
  };

  return (
    <div className={styles.taskItem} index={index} onClick={handleTaskClick}>
      <p className={styles.taskText}>{task.title}</p>
      <p className={styles.stopWatch}>{task.active && "⏱️"} </p>
      <p className="loadBar" style={{ ...loadBarStyle }}>
        {/* <style jsx>
          {`
            .loadBar {
              width: ${(task.active && timer / 25) * 100}%;
              background: lightgreen;
              height: 2px;
            }
          `}
        </style> */}
      </p>
      {/* <p className={styles.deleteBtn}>❌</p> */}
    </div>
  );
}
