"use client";

import React, { useState } from "react";
import Todo from "../todo/Todo.js";
import styles from "./todoController.module.scss";
import { v4 as uuidv4 } from "uuid";

export default function TodoController({
  timer,
  taskData,
  setTaskData,
  sessionDuration,
  handleTimer,
  setCurrentTask,
  setScrollCoordinate,
}) {
  const [taskInput, setTaskInput] = useState("");
  //  const MemoizedTodo = React.memo(Todo);

  function handleNewTask(event) {
    if (taskInput !== "") {
      setTaskData((prevTasks) => [
        {
          id: uuidv4(),
          title: taskInput,
          running: false,
          resources: [],
          progress: 0,
          sessions: [],
          color: "white",
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
          timer={timer}
          index={index}
          handleTimer={handleTimer}
          setTaskData={setTaskData}
          sessionDuration={sessionDuration}
          setCurrentTask={setCurrentTask}
          setScrollCoordinate={setScrollCoordinate}
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
        <button className={styles.taskSubmitBtn} onClick={handleNewTask}>
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
