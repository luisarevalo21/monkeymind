"use client";

import { React, useState, useEffect } from "react";
import styles from "./todo.module.css";

export default function Todo() {
  const [taskInput, setTaskInput] = useState("");
  const [taskData, setTaskData] = useState([
    // "Work on extension      ",
    // "Wash the dishes      ",
    // "Learn german       ",
    // "Check chatCPT api     ",
    // "Take cat from vet",
    // "Quit your job 🍌",
    // "Get a real life        ",
  ]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("tasks"));
    if (data !== []) {
      setTaskData(data);
    }
  }, [0]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskData));
  }, [taskData]);

  function handleClick(event) {
    if (taskInput !== "") {
      setTaskData((prev) => [taskInput, ...prev]);
    }
    setTaskInput("");
  }

  function handleInputChange(event) {
    setTaskInput(event.target.value);
  }

  let taskElements = taskData.map(function (task, index) {
    return (
      <div className={styles.taskItem} key={index}>
        {/* <p className={styles.deleteBtn}>❌</p> */}
        <p className={styles.taskText}>{task}</p>
        <p className={styles.stopwatch}>⏱️</p>
      </div>
    );
  });

  return (
    <div className={`container ${styles.component_wrapper}`}>
      <p>Todos</p>
      <div className={styles.taskInput_container}>
        <input
          id="taskInput"
          type="text"
          className={styles.taskInput}
          placeholder="New task 🤞"
          // onClick={handleClick}
          value={taskInput}
          onChange={handleInputChange}
        />
        <button className={styles.taskSubmit_btn} onClick={handleClick}>
          +
        </button>
      </div>
      <div className={styles.tasks}>{taskElements}</div>
    </div>
  );
}
