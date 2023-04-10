import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import TimerControl from "./components/timer/TimerControl";
import Todo from "./components/todo/Todo";

import styles from "./page.module.css";
import TimerExtension from "./components/timer/TimerControl";

const font = Space_Grotesk({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={font.className}>
      <TimerControl />
      <Todo />
    </main>
  );
}
