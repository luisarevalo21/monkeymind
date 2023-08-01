"use client";

import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { Karla } from "next/font/google";
import Work from "./work/page";
// import Chatbot from "./components/chatbot/Chatbot";

import styles from "./page.module.scss";

// const font = Space_Grotesk({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Work />
    </main>
  );
}
