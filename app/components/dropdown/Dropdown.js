import React, { useState, useRef } from "react";
import styles from "./dropdown.module.scss";

export default function Dropdown({ selected, optionsArray, selectItem }) {
  const optionElementsRef = useRef(null);
  const [active, setActive] = useState(false);

  function handleOptionClick(event, item) {
    setActive(!active);
    selectItem(item);
  }

  function handleSelectClick() {
    active
      ? (optionElementsRef.current.style.display = "block")
      : (optionElementsRef.current.style.display = "none");
    setActive(!active);
  }

  const optionElements = optionsArray.map((item, index) => {
    return (
      <div
        className={styles.option}
        onClick={(event) => handleOptionClick(event, item)}
        key={index}
      >
        {item.title}
      </div>
    );
  });

  return (
    <div className={styles.select} onClick={handleSelectClick}>
      <p className={styles.title}>{selected.title}</p>
      <div className={styles.optionElements} ref={optionElementsRef}>
        {optionElements}
      </div>
    </div>
  );
}
