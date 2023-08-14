"use client";

import React, { useState, useEffect, useRef, createContext } from "react";

import TimerController from "../components/timerController/TimerController";
import TodoController from "../components/todoController/TodoController";
import Timeline from "../components/timeline/Timeline";
import Chatbot from "../components/chatbot/Chatbot";
import Todo from "../components/todo/Todo";
import Bookmarks from "../components/bookmarks/Bookmarks";

import { tasksCollection, db } from "../firebase";
import { onSnapshot } from "firebase/firestore";

const TaskContext = createContext();
export { TaskContext };

export default function Work() {
  const [taskData, setTaskData] = useState(
    () => JSON.parse(localStorage.getItem("monkey_tasks")) || []
  );
  const [timer, setTimer] = useState(0);
  const [active, setActive] = useState(false);
  const [cloudTasks, setCloudTasks] = useState([]);
  const [currentSession, setCurrentSession] = useState({});
  const [sessionDuration, setSessionDuration] = useState(25);
  const [scrollCoordinate, setScrollCoordinate] = useState(0);
  const [currentTask, setCurrentTask] = useState(
    (taskData && taskData[0]) || "none"
  );
  const timerInterval = useRef(null);
  // lazy initiation, if no todo returns null, parse returns null

  // effect for  the local storage
  useEffect(() => {
    localStorage.setItem("monkey_tasks", JSON.stringify(taskData));
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

  useEffect(() => {
    let counter = timer;
    if (active) {
      timerInterval.current = setInterval(function () {
        if (counter < sessionDuration) {
          counter++;
          setTimer((prev) => prev + 1);
        } else {
          setActive(false);
        }
      }, 1000);
      return () => {
        clearInterval(timerInterval.current);
        setTimer(0);
        setActive(false);
      };
    }
  }, [active]);

  function handleTimer(event) {
    setActive((prev) => !prev);
  }

  return (
    <div className="workPage">
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
        <Timeline
          taskData={taskData}
          scrollCoordinate={scrollCoordinate}
          cloudTasks={cloudTasks}
        />
        <div className="taskControl">
          <TodoController
            taskData={taskData}
            setTaskData={setTaskData}
            cloudTasks={cloudTasks}
          />
          <TimerController
            timer={timer}
            sessionDuration={sessionDuration}
            handleTimer={handleTimer}
            setSessionDuration={setSessionDuration}
          />
          <Chatbot currentTask={currentTask} />
          {/* <Bookmarks /> */}
        </div>
      </TaskContext.Provider>
    </div>
  );
}
