"use client";

import { React, useState, useEffect, useRef, useContext } from "react";
import styles from "./todo.module.scss";
import { WorkContext } from "@/app/work/WorkContext";

export default function Todo({
  task,
  index,
  timer,
  handleTimer,
  setTaskData,
  sessionDuration,
  setScrollCoordinate,
  setCurrentTask,
}) {
  const [running, setRunning] = useState(false);
  const widthPercentagePerMinute = 100 / 48 / 30;

  const workContext = useContext(WorkContext);
  useEffect(() => {
    if (running) {
      setTaskData((prevTasks) => {
        let updatedTasks = prevTasks.map((item) => {
          if (item.id == task.id) {
            item.sessions[item.sessions.length - 1].duration++;
            return item;
          } else {
            return item;
          }
        });
        return updatedTasks;
      });
    }

    console.log(workContext);
    return () => {
      if (timer == sessionDuration) {
        setRunning(false);
        setTaskData((prevTasks) => {
          let updatedTasks = prevTasks.map((item) => {
            if (item.id == task.id) {
              item.sessions[item.sessions.length - 1].end_date = Date.now();
              return item;
            } else {
              return item;
            }
          });
          return updatedTasks;
        });
      }
    };
  }, [timer]);

  function startSession(event) {
    const now = new Date();
    const four_am = new Date().setHours(4, 0, 0, 0);

    const newSession = {
      start_date: Date.parse(now),
      end_date: null,
      prev_break:
        task.sessions.length > 0
          ? Date.parse(now) - task.sessions[task.sessions.length - 1].end_date
          : "No previous session",
      prev_break_short: false,
      task_id: task.id,
      task_title: task.title,
      duration: 0,
      total_time: 0,
      since_4am: Date.parse(now) - four_am,
    };

    // this is where I need to fix!!!
    setTaskData((prevTasks) => {
      prevTasks[index].sessions.push(newSession);
      return prevTasks;
    });

    setScrollCoordinate(
      (newSession.since_4am / 1000 / 60) * widthPercentagePerMinute
    );
    handleTimer();
    setRunning(true);
  }

  const loadBarStyle = {
    width: running ? `${(timer / 25) * 100}%` : "100%",
    background: running ? "lightgreen" : "white",
    height: "2px",
  };

  // let bananas = task.sessions.map(() => "🍌");

  return (
    <div className={styles.taskItem} onClick={startSession}>
      <p className={styles.taskText}>{task.title}</p>
      <p className={styles.sessionInfo}></p>
      <p className={styles.stopWatch}>
        {running && "⏱️"}
        {running && timer}
      </p>
      <p className="loadBar" style={{ ...loadBarStyle }}></p>
    </div>
  );
}
