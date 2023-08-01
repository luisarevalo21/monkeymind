"use client";

import { React, useState, useEffect, useRef, useContext } from "react";
import styles from "./todo.module.scss";
import { db } from "@/app/firebase";

export default function Todo({
  task,
  index,
  timer,
  handleTimer,
  setTaskData,
  sessionDuration,
  setScrollCoordinate,
  deleteTask,
}) {
  const [running, setRunning] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);
  const showOnHover = useRef(null);

  // to calculate x distance from left - x coordinate -  on timeline
  const widthPercentagePerMinute = 100 / 48 / 30;

  // const workContext = useContext(WorkContext);

  // checks if the "running" state turned true and to trigger duration increment
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
    // cleanout
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

  function startNewSession() {
    // session initialization time
    const now = new Date();
    // 4am of that day
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
      color: task.color,
      since_4am: Date.parse(now) - four_am,
    };

    // for the cloud one I need to update the setCloudTasks
    setTaskData((prevTasks) => {
      let currentItem = prevTasks.filter((item) => {
        return item.id == task.id;
      });

      let unchangedItems = prevTasks.filter((item) => {
        return item.id != task.id;
      });
      currentItem[0].sessions.push(newSession);
      //  prevTasks[index].sessions.push(newSession);
      return [...currentItem, ...unchangedItems];
    });

    setScrollCoordinate(
      (newSession.since_4am / 1000 / 60) * widthPercentagePerMinute
    );
    handleTimer();
    setRunning(true);
  }

  async function editCloudTask(text) {
    const docRef = doc(db, "tasks", task.id);
    await setDoc(docRef, { title: text }, { merge: true });
  }

  function editTask(event) {
    event.stopPropagation();
    setEditMode(true);
    inputRef.current.focus();
  }

  function saveChange(event) {
    event.stopPropagation();

    setTaskData((prevTasks) => {
      let targetTask = prevTasks.filter((item) => {
        return item.id === task.id;
      });
      let restOfData = prevTasks.filter((item) => {
        return item.id !== task.id;
      });
      targetTask[0].title = taskTitle;
      return [...targetTask, ...restOfData];
    });
    setEditMode(false);
  }

  function handleTitleChange(event) {
    event.stopPropagation();
    setTaskTitle(event.target.value);
  }

  function handleInputClick(event) {
    event.stopPropagation();
  }

  function handleMouseEnter(event) {
    showOnHover.current.style.visibility = "visible";
  }

  function handleMouseLeave(event) {
    showOnHover.current.style.visibility = "hidden";
  }
  const loadBarStyle = {
    width: running ? `${(timer / sessionDuration) * 100}%` : "100%",
    background: running ? "lightgreen" : "white",
    height: "2px",
  };

  // let bananas = task.sessions.map(() => "🍌");

  return (
    <div
      className={styles.taskItem}
      onClick={startNewSession}
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p
        className={styles.sessionInfo}
        style={{ backgroundColor: task.color }}
      ></p>
      <input
        className={styles.taskText}
        onMouseEnter={handleMouseEnter}
        onChange={handleTitleChange}
        onClick={handleInputClick}
        value={taskTitle}
        ref={inputRef}
        readOnly={!editMode}
        type="text"
      />
      <p className={styles.stopWatch}>
        {running && <span className={styles.stopWatchBtn}>⏱️</span>}
        {running && <span>{timer}</span>}
      </p>
      <div className={styles.showOnHover} ref={showOnHover}>
        {editMode ? (
          <span className={styles.saveBtn} onClick={saveChange}>
            💾
          </span>
        ) : (
          <span className={styles.editBtn} onClick={editTask}>
            ✏️
          </span>
        )}
        <span
          className={styles.deleteBtn}
          onClick={(event) => deleteTask(event, task.id)}
        >
          🗑️
        </span>
      </div>
      <p className="loadBar" style={{ ...loadBarStyle }}></p>
    </div>
  );
}
