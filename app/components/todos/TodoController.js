"use client";

import { React, useState, useEffect } from "react";
import Todo from "./Todo.js";
import styles from "./todos.module.css";

export default function TodoController({
  timer,
  handleTimer,
  taskData,
  setTaskData,
}) {
  const [taskInput, setTaskInput] = useState("");

  function handleTaskClick(event) {
    if (taskInput !== "") {
      setTaskData((prevTasks) => [
        {
          title: taskInput,
          active: false,
          progress: 0,
          sessions: [
            {
              session_id: "0",
              start_time: "-",
              end_time: "-",
            },
          ],
        },
        ...prevTasks,
      ]);
    }
    // reset input
    setTaskInput("");
  }

  function handleInputChange(event) {
    setTaskInput(event.target.value);
  }

  let taskElements =
    taskData &&
    taskData.map(function (task, index) {
      return (
        <Todo
          key={index}
          task={task}
          index={index}
          timer={timer}
          handleTimer={handleTimer}
          setTaskData={setTaskData}
        />
      );
    });

  return (
    <div className={`container ${styles.componentWrapper}`}>
      <p>Todos</p>
      <div className={styles.taskInputContainer}>
        <input
          id="taskInput"
          type="text"
          className={styles.taskInput}
          placeholder="New task 🤞"
          value={taskInput}
          onChange={handleInputChange}
        />
        <button className={styles.taskSubmitBtn} onClick={handleTaskClick}>
          +
        </button>
      </div>
      <div className={styles.tasks}>{taskElements}</div>
    </div>
  );
}
