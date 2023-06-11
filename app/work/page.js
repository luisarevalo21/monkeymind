"use client";

import { React, useState, useEffect } from "react";
import TimerController from "../components/timerController/TimerController";
import TodoController from "../components/todoController/TodoController";
import Timeline from "../components/timeline/Timeline";
import Chatbot from "../components/chatbot/Chatbot";

export default function Work() {
  const [timer, setTimer] = useState(0);
  const [taskData, setTaskData] = useState([]);
  const [sessionDuration, setSessionDuration] = useState(3);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let local_data = JSON.parse(localStorage.getItem("monkey_tasks"));
    !local_data && console.log("effect", "no data");
    local_data !== []
      ? setTaskData(local_data)
      : localStorage.setItem("monkey_tasks", JSON.stringify(taskData));
  }, []);

  // second setup for every data change
  useEffect(() => {
    localStorage.setItem("monkey_tasks", JSON.stringify(taskData));
  }, [taskData]);

  useEffect(() => {
    let timerInterval = null;
    let counter = timer;
    if (active) {
      timerInterval = setInterval(function () {
        if (counter < sessionDuration) {
          counter++;
          setTimer((prev) => prev + 1);
        } else {
          clearInterval(timerInterval);
          setTimer(0);
          setActive(false);
        }
      }, 10);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [active]);

  function handleTimer(event) {
    // event.preventDefault();
    setActive((prev) => !prev);
  }

  return (
    <main>
      <Timeline taskData={taskData} timer={timer} />
      <div className="taskControl">
        <TodoController
          timer={timer}
          handleTimer={handleTimer}
          taskData={taskData}
          setTaskData={setTaskData}
          sessionDuration={sessionDuration}
        />
        <TimerController
          timer={timer}
          handleTimer={handleTimer}
          setSessionDuration={setSessionDuration}
          sessionDuration={sessionDuration}
        />
        <Chatbot />
      </div>
    </main>
  );
}
