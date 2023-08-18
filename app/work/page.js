"use client";

import React, { useState, useEffect, useRef, createContext } from "react";

import TimerController from "../components/timerController/TimerController";
import TaskController from "../components/taskController/TaskController";
import Timeline from "../components/timeline/Timeline";
import Chatbot from "../components/chatbot/Chatbot";
import Bookmarks from "../components/bookmarks/Bookmarks";
import { tasksCollection, db } from "../firebase";
import { onSnapshot } from "firebase/firestore";

import styles from "./work.module.scss";

const TaskContext = createContext();
export { TaskContext };

export default function Work() {
  const [taskData, setTaskData] = useState(
    () => JSON.parse(localStorage.getItem("monkey_tasks")) || [{}]
  );
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [cloudTasks, setCloudTasks] = useState([]);
  const [currentSession, setCurrentSession] = useState({});
  const [sessionDuration, setSessionDuration] = useState(25);
  const [scrollCoordinate, setScrollCoordinate] = useState(0);
  const [currentTask, setCurrentTask] = useState(
    (taskData.length > 0 && taskData[0]) || "none"
  );

  const timerInterval = useRef(null);
  const minutes = useRef(0);
  // lazy initiation, if no todo returns null, parse returns null
  // effect for  the local storage
  useEffect(() => {
    localStorage.setItem("monkey_tasks", JSON.stringify(taskData));
    taskData.length > 0 ? setCurrentTask(taskData[0]) : setCurrentTask("none");
  }, [taskData]);

  // FETCING SNAPSHOT OF FIRESTORE AND UPDATING STATE
  useEffect(() => {
    // onSnaphot() is used for real time changes,
    // like an event listener it listens to db changes on this app
    // and when occured, it acts upon with the callback function
    // passing the most recent snaphot
    // that means firestore opens a websocket to this application and
    // stay connected until it unsubscribed from the websocket
    // therefore onSnaphot returns a unsubscription function to cleanup

    const unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
      const tasksArr = snapshot.docs.map((doc) =>
        // here map returns objects, with data extracted from doc with data() function (otherwise its obfuscated)
        //
        ({
          ...doc.data(),
          id: doc.id,
        })
      );
      setCloudTasks(tasksArr);
    });
    return unsubscribe;
  }, []);

  console.log(minutes.current);
  useEffect(() => {
    let counter = timer;
    if (timerRunning) {
      timerInterval.current = setInterval(function () {
        if (counter < sessionDuration) {
          setTimer((prev) => prev + 1);
          counter !== 0 && counter % 10 === 0 && minutes.current++;
          counter++;
        } else {
          setTimerRunning(false);
          minutes.current = 0;
        }
      }, 100);

      return () => {
        clearInterval(timerInterval.current);
        setTimer(0);
        setTimerRunning(false);
      };
    }
  }, [timerRunning]);

  function handleTimer(event) {
    setTimerRunning((prev) => !prev);
  }

  return (
    <div className={styles.workPage}>
      <TaskContext.Provider
        value={{
          sessionDuration,
          timer,
          handleTimer,
          setCurrentSession,
          setCurrentTask,
          scrollCoordinate,
          setScrollCoordinate,
          currentTask,
        }}
      >
        <div className={styles.timelineWrapper}>
          <Timeline
            taskData={taskData}
            scrollCoordinate={scrollCoordinate}
            cloudTasks={cloudTasks}
            currentSession={currentSession}
            setCurrentTask={setCurrentTask}
            timerRunning={timerRunning}
          />
        </div>

        {/* <div className={styles.taskControl}> */}
        <div className={styles.TaskControllerWrapper}>
          <TaskController
            taskData={taskData}
            setTaskData={setTaskData}
            cloudTasks={cloudTasks}
            setCurrentTask={setCurrentTask}
          />
        </div>
        <div className={styles.timerControllerWrapper}>
          <TimerController
            timer={timer}
            sessionDuration={sessionDuration}
            handleTimer={handleTimer}
            setSessionDuration={setSessionDuration}
            minutes={minutes.current}
          />
        </div>
        <div className={styles.chatbotWrapper}>
          <Chatbot currentTask={currentTask} setTaskData={setTaskData} />
        </div>
        {/* <Bookmarks /> */}
        {/* </div> */}
      </TaskContext.Provider>
    </div>
  );
}
