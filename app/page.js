import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { Karla } from "next/font/google";
import Timer from "./components/timer/Timer";
import Todo from "./components/todo/Todo";
import Timeline from "./components/timeline/Timeline";

import styles from "./page.module.css";
import Chatbot from "./components/chatbot/Chatbot";

// const font = Space_Grotesk({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Timeline />
      <div className="taskControl">
        <Todo />
        <Timer />
        <Chatbot />
      </div>
    </main>
  );
}
