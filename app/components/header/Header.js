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
            <Link href="/">Work</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link className="loginBtn" href="/login">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
