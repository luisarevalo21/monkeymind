import Image from "next/image";
import { Space_Grotesk } from "next/font/google";

import styles from "./page.module.css";

const font = Space_Grotesk({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={font.className}>
      <h1>Hello Monkey Mind</h1>
    </main>
  );
}
