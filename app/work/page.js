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
import Todos from "../components/todos/Todos";
import Timeline from "../components/timeline/Timeline";

export default function Work() {
  const [timer, setTimer] = useState(0);
  const [taskData, setTaskData] = useState([]);
  const [session, setSession] = useState({
    startTime: "start",
    endTime: "end",
  });

  // useEffect(() => {
  //   let data = JSON.parse(localStorage.getItem("tasks"));

  // }, [0]);

  useEffect(() => {
    console.log(taskData);
    // localStorage.setItem("tasks", JSON.stringify(taskData));
  }, [taskData]);

  function handleTimer(event) {
    event.preventDefault();

    let date = new Date();
    setSession((prev) => ({
      ...prev,
      startTime: date.toLocaleTimeString("en-US"),
    }));

    let userValue = document.getElementById("timerInput").value;

    const interval = setInterval(function () {
      if (userValue > 0) {
        userValue--;
        setTimer((prev) => prev + 1);
      } else {
        clearInterval(interval);
        let date = new Date();
        setSession((prev) => ({
          ...prev,
          endTime: date.toLocaleTimeString("en-US"),
        }));
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
          session={session}
        />
        <Timer timer={timer} handleTimer={handleTimer} session={session} />
        {/* <Chatbot /> */}
        <div></div>
      </div>
    </main>
  );
}
