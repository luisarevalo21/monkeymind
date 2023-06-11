import { React, useState, useEffect } from "react";
import styles from "./todo.module.scss";

export default function Todo({
  task,
  index,
  timer,
  handleTimer,
  setTaskData,
  sessionDuration,
}) {
  const [running, setRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState({});

  console.log("running at main function", running);

  useEffect(() => {
    if (running) {
      setTaskData((prevTasks) => {
        let updatedTasks = prevTasks.map((item) => {
          if (item.id == task.id) {
            item.sessions[item.sessions.length - 1].duration++;
            return item;
          } else {
            return item;
          }
        });
        return updatedTasks;
      });
    }
    return () => {
      if (timer == sessionDuration) {
        setRunning(false);
        setTaskData((prevTasks) => {
          let updatedTasks = prevTasks.map((item) => {
            if (item.id == task.id) {
              item.sessions[item.sessions.length - 1].end_date = Date.now();
              return item;
            } else {
              return item;
            }
          });
          return updatedTasks;
        });
      }
    };
  }, [timer]);

  function findTimeDelta(next, prev) {
    return prev ? next - prev : "First session";
  }

  function startSession() {
    let newSession = {
      start_date: Date.now(),
      end_date: null,
      prev_break:
        task.sessions.length > 0 &&
        Date.now() - task.sessions[task.sessions.length - 1].end_date,
      prev_break_short: false,
      task_id: task.id,
      duration: 0,
      total_time: 0,
    };

    setTaskData((prevTasks) => {
      prevTasks[index].sessions.push(newSession);
      return prevTasks;
    });
    handleTimer();
    setRunning(true);
  }

  // function handleTaskClick(event) {
  //   setActive(true);

  //   const newSessionStart = Date.now();
  //   const prevSessionEnd =
  //     task.sessions.length > 0
  //       ? task.sessions[task.sessions.length - 1].end_date
  //       : null;

  //   const delta = findTimeDelta(newSessionStart, prevSessionEnd);

  //   const newSession = {
  //     start_date: newSessionStart,
  //     end_date: null,
  //     prev_break: delta,
  //     prev_break_short: delta < 5000 ? true : false,
  //     task_id: task.id,
  //     duration: 0,
  //   };

  //  // 👇 this gets into the closure
  //   let intervalCounter = 0;
  //   const taskInterval = setInterval(() => {
  //     if (intervalCounter < sessionDuration) {
  //       intervalCounter++;
  //       setCounter((prev) => prev + 1);
  //       setSession((prev) => {
  //         console.log(prev);
  //         return { ...prev, duration: prev.duration + 1 };
  //       });
  //     } else {
  //       clearInterval(taskInterval);
  //       setActive(false);

  //       // instead update upon session end make it real time

  //       //👇  when finished update the session-end time

  //       setTaskData((prevTasks) => {
  //         let modifiedTasks = prevTasks.map(function (item) {
  //           if (item.id == task.id) {
  //             let newSession = item.sessions[item.sessions.length - 1];
  //             // newSession.end_date = Date.now();
  //             // mimicing minutes below!
  //             // newSession.duration = sessionDuration * 60 * 1000;
  //             // (newSession.end_date - newSession.start_date) / 1000;

  //             setSession((prev) => ({
  //               ...prev,
  //               end_date: prev.start_date + prev.duration * 60 * 1000,
  //             }));

  //             newSession = session;
  //             return {
  //               ...item,
  //               active: false,
  //             };
  //           } else {
  //             return item;
  //           }
  //         });
  //         return modifiedTasks;
  //       });
  //     }
  //   }, 100);

  //   setTaskData((prevTasks) => {
  //     let modifiedTasks = prevTasks.map(function (item) {
  //       if (item.id == task.id) {
  //         return {
  //           ...item,
  //           active: true,
  //           sessions: [...item.sessions, newSession],
  //         };
  //       } else {
  //         return item;
  //       }
  //     });
  //     return modifiedTasks;
  //   });
  // }

  const loadBarStyle = {
    width: running ? `${(timer / 25) * 100}%` : "100%",
    background: running ? "lightgreen" : "white",
    height: "1px",
  };

  // let bananas = task.sessions.map(() => "🍌");

  return (
    <div className={styles.taskItem} onClick={startSession}>
      <p className={styles.taskText}>{task.title}</p>
      <p className={styles.sessionInfo}></p>
      <p className={styles.stopWatch}>
        {running && "⏱️"}
        {running && timer}
      </p>
      <p className="loadBar" style={{ ...loadBarStyle }}></p>
    </div>
  );
}
