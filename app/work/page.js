"use client";

let exampleData = [
  {
    title: "Example task",
    active: false,
    sessions: [],
  },
];

import { React, useState, useEffect, use } from "react";
import Timer from "../components/timer/Timer";
import Todos from "../components/todos/TodoController";
import Timeline from "../components/timeline/Timeline";

export default function Work() {
  const [timer, setTimer] = useState(0);
  const [taskData, setTaskData] = useState([]);

  // console.log("I'm rendered on main:", timer);
  // console.log("mounted:", localStorage.getItem("monkey_tasks"));
  // initial setup for localstorage
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
        setTimer(0);
      }
    }, 1000);
  }

  return (
    <main>
      <Timeline timer={timer} />
      <div className="taskControl">
        <Todos
          timer={timer}
          handleTimer={handleTimer}
          taskData={taskData}
          setTaskData={setTaskData}
        />
        <Timer timer={timer} handleTimer={handleTimer} />
        {/* <Chatbot /> */}
        <div></div>
      </div>
    </main>
  );
}
