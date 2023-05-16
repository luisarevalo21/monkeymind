"use client";

import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { Karla } from "next/font/google";
import Timer from "./components/timerController/TimerController";
import Todo from "./components/todoController/TodoController";
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
    </main>
  );
}
