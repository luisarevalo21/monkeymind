"use client";

import { React, useState } from "react";
import Timer from "../components/timer/Timer";
import Todo from "../components/todo/Todo";
import Timeline from "../components/timeline/Timeline";

export default function Work() {
  const sessionPeriods = [25, 30, 40, 50];
  const [timer, setTimer] = useState(0);
  const [session, setSession] = useState({
    startTime: "start",
    finishTime: "finish",
  });

  function handleStart(event) {
    event.preventDefault();
    let date = new Date();

    setSession((prev) => ({
      ...prev,
      startTime: date.toTimeString(),
    }));

    let userValue = document.getElementById("timerInput").value;

    let interval = setInterval(function () {
      if (userValue > 0) {
        userValue--;
        setTimer((prev) => prev + 1);
      } else {
        clearInterval(interval);
        let date = new Date();
        setSession((prev) => ({
          ...prev,
          finishTime: date.toTimeString(),
        }));
      }
    }, 1000);
  }

  return (
    <main>
      <Timeline timer={timer} />
      <div className="taskControl">
        <Todo timer={timer} handleStart={handleStart} session={session} />
        <Timer timer={timer} handleStart={handleStart} session={session} />
        {/* <Chatbot /> */}
      </div>
    </main>
  );
}
