import React from "react";
import styles from "./timeline.module.scss";

export default function Session(props) {
  const { duration, since_4am, task_title } = props.session;

  const widthPercentagePerMinute = 100 / 48 / 30;

  const x_on_timeline = (since_4am / 1000 / 60) * widthPercentagePerMinute;
  const width = (duration / 60) * widthPercentagePerMinute;

  // console.table([since_4am, duration, task_title, x_coordinate]);
  let style = {
    left: `${x_on_timeline}%`,
    width: `${width}%`,
  };

  return (
    <div className={styles.pastSession} style={style}>
      {task_title}
    </div>
  );
}
