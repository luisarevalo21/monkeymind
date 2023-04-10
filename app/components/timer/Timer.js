"use client";

import React, { useState, useEffect } from "react";

const Timer = ({ maxCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Timer">
      <h2>Countdown Timer</h2>
      <p>{count}</p>
      {count >= maxCount && <p>Time's up!</p>}
    </div>
  );
};

export default Timer;
