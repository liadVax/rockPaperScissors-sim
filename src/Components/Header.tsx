import { Component } from "solid-js";
import styles from "../App.module.css";
const Header: Component = () => {
  return (
    <header
      style={`
            width: 100%;
            background: rgb(240,128,128);
            background: linear-gradient(270deg, rgba(240,128,128,1) 0%,
             rgba(255,250,205,1) 50%,
              rgba(144,238,144,1) 100%);`}
    >
      <h1 class={styles.Header}>
        ROCK 🤘 PAPER 📄 SCISSORS ✂️
        <br />
        BATTLE-ROYAL!
      </h1>
    </header>
  );
};

export default Header;
