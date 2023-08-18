"use client";

import React, { useState, useRef, Children } from "react";
import Task from "../task/Task.js";
import Dropdown from "../dropdown/Dropdown.js";
import styles from "./taskController.module.scss";
import { v4 as uuidv4 } from "uuid";
// these are from our locally created firestore app
import { tasksCollection, db } from "@/app/firebase.js";
// these are from local firestore dependencies
import { addDoc, deleteDoc, doc } from "firebase/firestore";

export default function TodoController({
  cloudTasks,
  taskData,
  setTaskData,
  setCurrentTask,
}) {
  const colorArray = [
    { title: "green", value: "#A7F3D0" },
    { title: "purple", value: "#DDD6FE" },
    { title: "yellow", value: "#FDE68A" },
    { title: "blue", value: "#BAE6FD" },
    { title: "red", value: "#FECDD3" },
  ];

  const [taskText, setTaskText] = useState("");
  const [taskColor, setTaskColor] = useState(generateRandomColor);

  // CREATE LOCAL TASK

  function generateRandomColor() {
    let random = Math.floor(Math.random() * 5);
    return colorArray[random];
  }

  function createLocalTask(event) {
    if (taskText != "") {
      const newTask = {
        id: uuidv4(),
        title: taskText,
        running: false,
        resources: [],
        ai_conversations: [],
        progress: 0,
        sessions: [],
        color: taskColor.value,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      setTaskData((prevTasks) => [newTask, ...prevTasks]);
      setTaskText("");
      setTaskColor(generateRandomColor());
    }
  }
  // CREAT FIRESTORE TASK
  async function createCloudTask(event) {
    const newCloudTask = {
      // no need for id, firestore gives it
      title: taskText,
      running: false,
      value_goal: null,
      resources: [],
      ai_conversations: [],
      progress: 0,
      sessions: [],
      cloud: true,
      color: taskColor.value,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // add newly created task as a document to the collection named "taskCollection"
    // addDoc returns a reference to that doc
    const newCloudTaskRef = await addDoc(tasksCollection, newCloudTask);
  }

  function sortTasks() {
    setTaskData((prev) => {
      prev.sort((a, b) => {
        return a.updatedAt - b.updatedAt;
      });
    });
  }
  // create a task both on local and cloud storage
  function handleInputChange(event) {
    setTaskText(event.target.value);
  }

  function deleteTask(event, taskId) {
    // to prevent event from bubbling to parent use stopPropagation!
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
        <Task
          key={task.id}
          task={task}
          setTaskData={setTaskData}
          deleteTask={deleteTask}
        />
      );
    });

  const cloudTaskElements = cloudTasks.map(function (task, index) {
    return (
      <Task
        key={task.id}
        task={task}
        index={index}
        setTaskData={setTaskData}
        deleteTask={deleteCloudTask}
      />
    );
  });

  return (
    <div className={`container ${styles.component}`}>
      <h4 className={styles.title}>Tasks</h4>
      <div className={styles.taskInputContainer}>
        <div className={styles.taskInputs}>
          <Dropdown
            selected={taskColor}
            optionsArray={colorArray}
            selectItem={setTaskColor}
            className={styles.selectTaskColor}
          />
          <input
            type="text"
            className={styles.taskText}
            placeholder="Create new task 🤞"
            value={taskText}
            onChange={handleInputChange}
          />
        </div>
        <button className={styles.taskSubmitBtn} onClick={createLocalTask}>
          💾
        </button>
        <button className={styles.taskSubmitBtn} onClick={createCloudTask}>
          ☁️
        </button>
      </div>

      <div className={styles.tasks}>
        {taskElements.length == 0 ? (
          <p className={styles.noTaskWarning}>You have no tasks</p>
        ) : (
          <>
            <h5 className={styles.title}>Local Tasks</h5>
            {taskElements}
          </>
        )}
      </div>

      <div className={styles.tasks}>
        {cloudTaskElements.length == 0 ? (
          <p className={styles.noTaskWarning}>You have no cloud tasks</p>
        ) : (
          <>
            <h5 className={styles.title}>Cloud Tasks</h5>
            {cloudTaskElements}
          </>
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
