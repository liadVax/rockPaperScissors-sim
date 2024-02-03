import { Component } from "solid-js";

const Header: Component = () => {
  return (
    <header
      style={`
            background: rgb(240,128,128);
            background: linear-gradient(270deg, rgba(240,128,128,1) 0%,
             rgba(255,250,205,1) 50%,
              rgba(144,238,144,1) 100%);`}
    >
      <h1
        style={`text-align:center; 
            line-height:150%;
            margin:0;
            padding:10px; 
            word-spacing:4px;
            border-bottom:8px double black;
          `}
      >
        ROCK 🤘 PAPER 📄 SCISSORS ✂️
        <br />
        BATTLE-ROYAL!
      </h1>
    </header>
  );
};

export default Header;
