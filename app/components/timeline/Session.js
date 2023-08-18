import React, { useRef } from "react";
import styles from "./timeline.module.scss";

export default function Session(props) {
  const { duration, since_4am, task_title, color } = props.session;

  const sessionInfoRef = useRef(null);
  const widthPercentagePerMiliSecond = 1 / 24 / 60 / 60 / 1000;

  const x_on_timeline = since_4am * widthPercentagePerMiliSecond;
  // multiplying 1000 * 60 on purpose to see result as if duration is in minutes
  const width = duration * widthPercentagePerMiliSecond * 1000 * 60;

  function handleMouseEnter() {
    sessionInfoRef.current.style.display = "block";
  }

  function handleMouseLeave() {
    sessionInfoRef.current.style.display = "none";
  }

  let style = {
    left: `${x_on_timeline * 100}%`,
    width: `${width * 100}%`,
    backgroundColor: color,
  };

  let sessinInfoStyle = {
    left: `${x_on_timeline * 100}% `,
    top: "-2em",
  };

  return (
    <div
      className={styles.session}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.sessionInfo}
        ref={sessionInfoRef}
        style={sessinInfoStyle}
      >
        <p> {task_title} </p>
      </div>
    </div>
  );
}
