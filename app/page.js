"use client";

import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { Karla } from "next/font/google";
import Timer from "./components/timer/Timer";
import Todo from "./components/todos/TodoController";
import Timeline from "./components/timeline/Timeline";
import Work from "./work/page";
// import Chatbot from "./components/chatbot/Chatbot";

import styles from "./page.module.css";
import { useState } from "react";

// const font = Space_Grotesk({ subsets: ["latin"] });

export default function Home() {
  const [timer, setTimer] = useState(0);

  return (
    <main>
      <Work />
      {/* <Timeline />
      <div className="taskControl">
        <Todo />
        <Timer />
        <Chatbot />
      </div> */}
    </main>
  );
}
