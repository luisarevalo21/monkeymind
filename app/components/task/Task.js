"use client";

import { React, useState, useEffect, useRef, useContext } from "react";
import { TaskContext } from "@/app/work/page";
import styles from "./todo.module.scss";
import { db } from "@/app/firebase";
import { setDoc, doc, updateDoc } from "firebase/firestore";

export default function Task({ task, setTaskData, deleteTask }) {
  const [running, setRunning] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);
  const showOnHover = useRef(null);

  const {
    currentTask,
    setCurrentSession,
    setCurrentTask,
    timer,
    handleTimer,
    sessionDuration,
    setScrollCoordinate,
  } = useContext(TaskContext);

  // console.log(value);
  // to calculate x distance from left - x coordinate -  on timeline
  //const widthPercentagePerMiliSeconds = 1 / 24h/ 60m/ 60s / 1000 ms
  const widthPercentagePerMiliSeconds = 1 / 24 / 60 / 60 / 1000;

  // checks if the "running" state turned true and to trigger duration increment

  // TIMER EFFECT
  useEffect(() => {
    if (running) {
      if (task.cloud) {
        let sessionsClone = [...task.sessions];
        let lastSession = sessionsClone.pop();

        lastSession.duration++;
        sessionsClone.push(lastSession);

        const saveOnCloud = async function () {
          const docRef = doc(db, "tasks", task.id);
          await setDoc(docRef, { sessions: sessionsClone }, { merge: true });
        };
        saveOnCloud();
      } else {
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
    }
    // cleanout
    return () => {
      if (timer == sessionDuration) {
        setRunning(false);

        if (task.cloud) {
          let sessionsClone = [...task.sessions];
          const lastSession = sessionsClone.pop();

          lastSession.end_date = Date.now();
          sessionsClone.push(lastSession);

          const saveOnCloud = async function () {
            const docRef = doc(db, "tasks", task.id);
            await setDoc(
              docRef,
              { sessions: sessionsClone, running: false },
              { merge: true }
            );
          };
          saveOnCloud();
        } else {
          setTaskData((prevTasks) => {
            let updatedTasks = prevTasks.map((item) => {
              if (item.id == currentTask.id) {
                item.sessions[item.sessions.length - 1].end_date = Date.now();
                return item;
              } else {
                return item;
              }
            });
            return updatedTasks;
          });
        }
      }
    };
  }, [timer]);

  // START NEW SESSION ON CLICK
  async function startNewSession() {
    const now = Date.now();
    const four_am = new Date().setHours(4, 0, 0, 0);

    const newSession = {
      start_date: now,
      end_date: null,
      prev_break:
        task.sessions.length > 0
          ? now - task.sessions[task.sessions.length - 1].end_date
          : "No previous session",
      prev_break_short: false,
      task_id: task.id,
      task_title: task.title,
      duration: 0,
      total_time: 0,
      color: task.color,
      since_4am: now - four_am,
    };

    setScrollCoordinate(newSession.since_4am * widthPercentagePerMiliSeconds);
    setCurrentTask(task);
    setCurrentSession(newSession);
    handleTimer();

    if (task.cloud) {
      const docRef = doc(db, "tasks", task.id);
      await setDoc(
        docRef,
        { sessions: [...task.sessions, newSession], running: true },
        { merge: true }
      );
    } else {
      setTaskData((prevTasks) => {
        let modifiedItem = prevTasks.filter((item) => {
          return item.id == task.id;
        });
        modifiedItem[0].sessions.push(newSession);
        let unmodifiedItems = prevTasks.filter((item) => {
          return item.id != task.id;
        });
        return [...modifiedItem, ...unmodifiedItems];
      });
    }

    setRunning(true);
  }

  async function saveOnCloud(event) {
    event.stopPropagation();
    const docRef = doc(db, "tasks", task.id);
    await setDoc(
      docRef,
      { title: taskTitle, updatedAt: Date.now() },
      { merge: true }
    );
  }

  function editTask(event) {
    event.stopPropagation();
    setEditMode(true);
    inputRef.current.focus();
  }

  function saveOnLocal(event) {
    event.stopPropagation();

    setTaskData((prevTasks) => {
      let targetTask = prevTasks.filter((item) => {
        return item.id === task.id;
      });
      let restOfData = prevTasks.filter((item) => {
        return item.id !== task.id;
      });
      targetTask[0].title = taskTitle;
      targetTask[0].updatedAt = Date.now();
      return [...targetTask, ...restOfData];
    });
    setEditMode(false);
  }

  function handlePressEnter(event) {
    if (editMode && event.key == "Enter") {
      saveOnLocal(event);
    }
  }

  function handleTitleChange(event) {
    event.stopPropagation();
    setTaskTitle(event.target.value);
  }

  function handleInputClick(event) {
    editMode && event.stopPropagation();
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

  return (
    <div
      className={styles.taskItem}
      onClick={startNewSession}
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ border: editMode && "1px dashed black" }}
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
        onKeyDown={handlePressEnter}
        value={taskTitle}
        ref={inputRef}
        readOnly={!editMode}
        type="text"
        style={{ cursor: editMode ? "text" : "pointer" }}
      />
      <p className={styles.stopWatch}>
        {running && <span className={styles.stopWatchBtn}>⏱️</span>}
        {running && <span>{timer}</span>}
      </p>
      <div className={styles.showOnHover} ref={showOnHover}>
        {editMode ? (
          <span
            className={styles.saveBtn}
            onClick={task.cloud ? saveOnCloud : saveOnLocal}
          >
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
      <p className={styles.loadBar} style={{ ...loadBarStyle }}></p>
    </div>
  );
}
