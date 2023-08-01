"use client";

import React, { useState, useRef } from "react";
import Todo from "../todo/Todo.js";
import Dropdown from "../dropdown/Dropdown.js";
import styles from "./todoController.module.scss";
import { v4 as uuidv4 } from "uuid";
import { tasksCollection, db } from "@/app/firebase.js";
import { addDoc, deleteDoc, doc } from "firebase/firestore";

export default function TodoController({
  timer,
  taskData,
  setTaskData,
  sessionDuration,
  handleTimer,
  setCurrentTask,
  setScrollCoordinate,
  cloudTasks,
  setCloudTasks,
}) {
  const colorArray = [
    { title: "green", value: "#A7F3D0" },
    { title: "purple", value: "#DDD6FE" },
    { title: "yellow", value: "#FDE68A" },
    { title: "blue", value: "#BAE6FD" },
    { title: "red", value: "#FECDD3" },
  ];

  const [taskInput, setTaskInput] = useState("");
  const [taskColor, setTaskColor] = useState(colorArray[0]);

  function createLocalTask(event) {
    event.preventDefault();
    if (taskInput !== "") {
      const newTask = {
        id: uuidv4(),
        title: taskInput,
        running: false,
        resources: [],
        progress: 0,
        sessions: [],
        color: taskColor.value,
      };

      setTaskData((prevTasks) => [newTask, ...prevTasks]);
      // reset input
      setTaskInput("");
    }
  }
  // firestore function
  async function createCloudTask(event) {
    // no need for id, firestore gives it
    event.preventDefault();
    const newCloudTask = {
      title: taskInput,
      running: false,
      resources: [],
      progress: 0,
      sessions: [],
      color: taskColor.value,
    };

    // add a newly created object as a document to the collection named "taskCollection"
    // addDoc returns a reference to that doc
    const newCloudTaskRef = await addDoc(tasksCollection, newCloudTask);
  }

  // create a task both on local and cloud storage
  function handleInputChange(event) {
    setTaskInput(event.target.value);
  }

  function handleSelect(event) {
    setTaskColor(event.target.value);
  }

  function deleteTask(event, taskId) {
    // to prevent event from bubbling to parent, we use stopPropagation!
    event.stopPropagation();
    setTaskData((prevTasks) => {
      // the most practical way to remove an item from an array
      return prevTasks.filter((task) => {
        return task.id !== taskId;
      });
    });
  }

  async function deleteCloudTask(event, taskId) {
    event.stopPropagation();
    const docRef = doc(db, "tasks", taskId);
    await deleteDoc(docRef);
  }

  function handleDeleteAll(event) {
    setTaskData([]);
  }

  function handleShareAll(event) {
    alert("select a friend");
  }

  const taskElements =
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
          taskData={taskData}
          deleteTask={deleteTask}
        />
      );
    });

  const cloudTaskElements = cloudTasks.map(function (task, index) {
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
        deleteTask={deleteCloudTask}
      />
    );
  });

  return (
    <div className={`container ${styles.component}`}>
      <h4>Local Tasks</h4>
      <div className={styles.taskInputContainer}>
        <input
          id="taskInput"
          type="text"
          className={styles.taskInput}
          placeholder="Create new task 🤞"
          value={taskInput}
          onChange={handleInputChange}
        />
        <button className={styles.taskSubmitBtn} onClick={createLocalTask}>
          💾
        </button>
        <button className={styles.taskSubmitBtn} onClick={createCloudTask}>
          ☁️
        </button>
      </div>
      <Dropdown
        selected={taskColor}
        optionsArray={colorArray}
        selectItem={setTaskColor}
      />
      <div className={styles.tasks}>
        {/* {taskElements} */}
        {taskElements.length == 0 ? (
          <p className={styles.noTaskWarning}>You have no tasks</p>
        ) : (
          taskElements
        )}
      </div>
      <h4>Cloud Tasks</h4>
      <div className={styles.tasks}>
        {/* {taskElements} */}

        {cloudTaskElements.length == 0 ? (
          <p className={styles.noTaskWarning}>You have no cloud tasks</p>
        ) : (
          cloudTaskElements
        )}
      </div>

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
