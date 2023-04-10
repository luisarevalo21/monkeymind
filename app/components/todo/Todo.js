"use client";

import { React, useState } from "react";
import styles from "./todo.module.css";

export default function Todo() {
  const [tasksData, setTaskData] = useState(["none"]);

  function handleClick(event) {
    console.log("clicked");
  }

  return (
    <div className={`container ${styles.todo}`}>
      <button className={styles.createTask} onClick={handleClick}>
        <p>+Create a new task</p>
      </button>
    </div>
  );
}
