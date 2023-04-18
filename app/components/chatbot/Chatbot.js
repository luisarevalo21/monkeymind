import React from "react";
import styles from "./chatbot.module.css";

export default function Chatbot() {
  return (
    <div className={`container ${styles.componentWrapper}`}>
      <p>Ask AI</p>
      <input
        type="text"
        className={styles.promptInput}
        placeholder=" + New prompt"
      />
    </div>
  );
}
