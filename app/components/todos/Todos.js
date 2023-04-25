"use client";

import { React, useState, useEffect } from "react";
import Todo from "./Todo.js";
import styles from "./todos.module.css";

export default function Todos({ timer, handleTimer, taskData, setTaskData }) {
  const [taskInput, setTaskInput] = useState("");

  function handleClick(event) {
    if (taskInput !== "") {
      setTaskData((prevTasks) => [
        {
          title: taskInput,
          active: false,
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
          timer={timer}
          index={index}
          active={task.active}
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
        <button className={styles.taskSubmitBtn} onClick={handleClick}>
          +
        </button>
      </div>
      <div className={styles.tasks}>{taskElements}</div>
    </div>
  );
}
