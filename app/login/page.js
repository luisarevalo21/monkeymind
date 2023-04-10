import React from "react";

export default function Login() {
  return (
    <div>
      <div class="splash">
        <h1>
          <span class="not-inline">Lost</span>
          <strong>your attention?</strong>
        </h1>
        <span class="beta-text">Currently in Beta</span>
        <p class="top-text"></p>
      </div>
      <div class="login">
        <img
          class="img-main"
          src="images/avatar.png"
          alt="My Scrimba avatar."
        />
        <h2>Monkey Mind</h2>
        <span class="subheading">Take control of your attention back</span>
        <p>
          It's time to focus on what really matters. MonkeyMind helps you to
          enhace your digital well-being and productivity
        </p>
        <form>
          <input type="text" required placeholder="Name" aria-label="Name" />
          <input type="email" required placeholder="Email" aria-label="Email" />
          <button class="btn btn-primary">Sign in</button>
        </form>
        <p class="fine-print">
          We'll never share your information without permission
        </p>
      </div>
    </div>
  );
}
