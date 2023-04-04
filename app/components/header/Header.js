import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img className="logo-icon" src="/icon128.png" />
        <p className="logo-text">Monkey Mind</p>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home </Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
