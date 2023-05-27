"use client";

import { React, useState, useEffect, use } from "react";
import TimerController from "../components/timerController/TimerController";
import TodoController from "../components/todoController/TodoController";
import Timeline from "../components/timeline/Timeline";
import Chatbot from "../components/chatbot/Chatbot";

export default function Work() {
  const [timer, setTimer] = useState(0);
  const [taskData, setTaskData] = useState([]);
  const [sessionDuration, setSessionDuration] = useState(25);

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

  function handleTimer(event) {
    event.preventDefault();
    const userValue = parseInt(document.getElementById("timerInput").value);
    let counter = 0;
    const intervalId = setInterval(function () {
      if (counter < userValue) {
        counter++;
        setTimer((prev) => prev + 1);
      } else {
        clearInterval(intervalId);
        setTaskData((prev) => {
          let newData = prev.map((item) => ({ ...item, active: false }));
          setTaskData(newData);
        });
        setTimer(0);
      }
    }, 1000);
  }

  return (
    <main>
      <Timeline taskData={taskData} />
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
