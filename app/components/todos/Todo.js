import { React, useState, useEffect } from "react";
import styles from "./todos.module.css";

export default function Todo({ task, timer, index, handleTimer, setTaskData }) {
  useEffect(() => {
    if (timer === 0) {
      setActive(false);
    }
  }, [timer]);

  function handleTaskClick(event) {
    handleTimer(event);

    // let date = new Date();
    // setSession((prev) => ({
    //   ...prev,
    //   startTime: date.toTimeString(),
    // }));

    // using grid, solves redundant divs so that click can target
    // either child or parent, no grandchild concern

    const currentTaskIndex =
      event.target.className == styles.taskItem
        ? event.target.getAttribute("index")
        : event.target.parentElement.getAttribute("index");

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

  return (
    <div className={styles.taskItem} index={index} onClick={handleTaskClick}>
      <p className={styles.taskText}>{task.title}</p>
      <p className={styles.stopWatch}>{task.active && "active"}⏱️</p>
      {/* <p className={styles.deleteBtn}>❌</p> */}
      <div
        className="loadBar"
        style={{
          width: `${(task.active && timer / 25) * 100}%`,
          height: "2px",
          backgroundColor: "lightgreen",
        }}
      ></div>
    </div>
  );
}
