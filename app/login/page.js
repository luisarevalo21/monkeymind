import React from "react";
import styles from "./login.module.scss";

export default function Login() {
  return (
    <div className={styles.component}>
      <div className={styles.splash}>
        <h1>
          <span className={styles.notInline}>Are you a</span>
          <strong>multitasker?</strong>
        </h1>
        <p className={styles.monkeyEmoji}>🐒</p>
        <p className={styles.topText}>We don't think so..</p>
      </div>
      <div className={styles.login}>
        <h2>Monkey Mind</h2>
        <span className={styles.subheading}>Gain your attention back!</span>
        <p>
          Time to focus on what really matters! MonkeyMind helps you to stay
          single-tasked and committed to your goals.
        </p>
        <form className={styles.loginForm}>
          <input type="text" required placeholder="Name" aria-label="Name" />
          <input type="email" required placeholder="Email" aria-label="Email" />
          <button>Sign in</button>
        </form>
        <p className={styles.betaText}>Currently in Beta</p>
      </div>
    </div>
  );
}
