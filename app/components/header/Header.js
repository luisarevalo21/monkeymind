import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link href="/">
        <div className="logo">
          <img className="logo-icon" src="/icon128.png" />
          <p className="logo-text">Monkey Mind</p>
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/work">Work</Link>
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
