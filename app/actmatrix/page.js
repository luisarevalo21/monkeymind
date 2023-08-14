"use client";

import React from "react";
import Draggable from "react-draggable";
import styles from "./actmatrix.module.scss";

export default function ActMatrix() {
  return (
    <div className={styles.component}>
      <h1>Act Matrix</h1>
      <div className={styles.actCanvas}>
        <div className={styles.awayOutside}>
          <Draggable>
            <div className={styles.draggableItem}>I'm a draggable note</div>
          </Draggable>
        </div>
        <div className={styles.forwardOutside}></div>
        <div className={styles.awayInside}></div>
        <div className={styles.forwardInside}></div>
      </div>
    </div>
  );
}
