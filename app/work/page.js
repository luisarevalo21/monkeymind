"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import TimerController from "../components/timerController/TimerController";
import TodoController from "../components/todoController/TodoController";
import Timeline from "../components/timeline/Timeline";
import Chatbot from "../components/chatbot/Chatbot";
import { WorkContext } from "./WorkContext";

export default function Work() {
  const [timer, setTimer] = useState(0);
  // lazy initiation, if no todo returns null, parse returns null
  const [taskData, setTaskData] = useState(
    () => JSON.parse(localStorage.getItem("monkey_tasks")) || []
  );
  const [sessionDuration, setSessionDuration] = useState(3);
  const [active, setActive] = useState(false);
  const [scrollCoordinate, setScrollCoordinate] = useState(0);
  const [currentTask, setCurrentTask] = useState(taskData[0] && taskData[0]);
  const timerInterval = useRef(null);

  // const sessionInterval = useRef(null);

  // const now = new Date();
  // const four_am = new Date();
  // console.log(now);
  // console.log(Date.parse(now));
  // console.log(four_am.setHours(4, 0, 0, 0));

  useEffect(() => {
    localStorage.setItem("monkey_tasks", JSON.stringify(taskData));
  }, [taskData]);

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
      }, 10);
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
    <main>
      <Timeline taskData={taskData} scrollCoordinate={scrollCoordinate} />
      <div className="taskControl">
        <TodoController
          timer={timer}
          taskData={taskData}
          handleTimer={handleTimer}
          setTaskData={setTaskData}
          sessionDuration={sessionDuration}
          setScrollCoordinate={setScrollCoordinate}
          setCurrentTask={setCurrentTask}
        />
        <TimerController
          timer={timer}
          sessionDuration={sessionDuration}
          handleTimer={handleTimer}
          setSessionDuration={setSessionDuration}
        />
        <Chatbot />
      </div>
    </main>
  );
}
