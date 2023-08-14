import React from "react";
import Link from "next/link";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.component}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.logo}>
            <img className={styles.logoIcon} src="/icon128.png" />
            <p className={styles.logoText}>Monkey Mind</p>
          </div>
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/work">Work</Link>
            </li>
            <li>
              <Link href="/actmatrix">Act</Link>
            </li>
            <li>
              <Link className="loginBtn" href="/login">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
