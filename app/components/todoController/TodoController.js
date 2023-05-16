"use client";

import { React, useState, useEffect } from "react";
import Todo from "../todo/Todo.js";
import styles from "./todoController.module.scss";

export default function TodoController({
  timer,
  handleTimer,
  taskData,
  setTaskData,
}) {
  const [taskInput, setTaskInput] = useState("");

  function handleTaskSubmit(event) {
    if (taskInput !== "") {
      setTaskData((prevTasks) => [
        {
          id: prevTasks.length + 1,
          title: taskInput,
          active: false,
          resources: [],
          progress: 0,
          sessions: [],
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

  function handleDeleteAll(event) {
    setTaskData([]);
  }

  function handleShareAll(event) {
    alert("select a friend");
  }

  let taskElements =
    taskData &&
    taskData.map(function (task, index) {
      return (
        <Todo
          key={task.id}
          task={task}
          index={index}
          timer={timer}
          handleTimer={handleTimer}
          setTaskData={setTaskData}
        />
      );
    });

  return (
    <div className={`container ${styles.component}`}>
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
        <button className={styles.taskSubmitBtn} onClick={handleTaskSubmit}>
          +
        </button>
      </div>
      <div className={styles.tasks}>{taskElements}</div>
      <div className={styles.actionBtns}>
        <button className={styles.deleteAll} onClick={handleDeleteAll}>
          Delete all
        </button>
        <button className={styles.shareAll} onClick={handleShareAll}>
          Share tasks
        </button>
      </div>
    </div>
  );
}
