"use client";

import React, { useState, useEffect } from "react";
import styles from "./chatbot.module.scss";

export default function Chatbot({ currentTask, setTaskData }) {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [conversationThread, setConversationThread] = useState([]);

  console.log(currentTask);

  // useEffect(() => {
  //   const currentTaskClone = { ...currentTask };
  //   currentTaskClone.ai_conversations = conversationThread;
  //   setTaskData((prev) => {
  //     const nonModifiedItems = prev.filter(
  //       (item) => !item.id == currentTask.id
  //     );
  //     return [currentTaskClone, ...nonModifiedItems];
  //   });
  // }, [conversationThread]);

  // async function fetchBotReply() {
  // const apiUrl = "https://api.openai.com/v1/chat/completions";
  // const apiKey = "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";

  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${apiKey}`,
  // };

  // const requestBody = {
  //   model: "gpt-3.5-turbo", // Specify the model you want to use
  //   messages: [
  //     { role: "system", content: "You are a helpful assistant." },
  //     { role: "user", content: currentPrompt },
  //   ],
  // };

  // const response = await fetch(apiUrl, {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify(requestBody),
  // });
  // const data = await response.json();

  // console.log(data);

  //   setConversationThread((prev) => {
  //     try {
  //       // prev.at(-1).response = data.choices[0].message.content;
  //       prev.at(-1).response = "I'm the response";
  //     } catch (e) {
  //       console.log(e);
  //     }

  //     return prev;
  //   });
  // }

  function handleInputChange(event) {
    setCurrentPrompt(event.target.value);
  }

  function handleSubmitPrompt() {
    setConversationThread((prev) => [
      { prompt: currentPrompt, response: null },
      ...prev,
    ]);

    setCurrentPrompt("");
    //fetchBotReply();
  }

  const conversationElements =
    conversationThread.length > 0 ? (
      conversationThread.map((item, index) => {
        return (
          <div key={index} className={styles.conversationItem}>
            <p className={styles.userPrompt}>Prompt{item.prompt}</p>
            <p className={styles.aiResponse}>Answer{item.response}</p>
          </div>
        );
      })
    ) : (
      <p>No previous conversation</p>
    );

  const placeholder =
    currentTask === "none"
      ? `+ New prompt`
      : `+ New promt about current task:${currentTask.title}`;

  return (
    <div className={`container ${styles.component}`}>
      <h4>AI Assistant</h4>

      <div className={styles.newChat}>
        <input
          type="text"
          className={styles.promptInput}
          placeholder={placeholder}
          onChange={handleInputChange}
          value={currentPrompt}
        />
        <button className={styles.submitPromptBtn} onClick={handleSubmitPrompt}>
          💬
        </button>
      </div>
      <div className={styles.aiConversations}>{conversationElements}</div>
    </div>
  );
}
