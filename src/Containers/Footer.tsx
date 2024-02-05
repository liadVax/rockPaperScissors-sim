import { Component, createSignal, Show } from "solid-js";

const Footer: Component = () => {
  const [isHidden, setHidden] = createSignal(true);

  const toggleVisibility = () => {
    setHidden(!isHidden());
  };

  return (
    <footer
      style={`
         display: flex;
         justify-content: center;
         align-items: center;
         text-align: center;
         padding: 10px;
         background-color: #f0f0f0;
         position: fixed;
         bottom: 0;
         width: 100%;
         flex-direction:column;
      `}
    >
      <button
        style={`
          position:absolute;
          right:0;
          top:0;
          padding:0px 22px 0px 2px ; 
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          outline: none;
        `}
        onClick={toggleVisibility}
      >
        {isHidden() ? "✖️" : "➕"}
      </button>
      <Show when={isHidden()}>
        <p style={"font-size: 14px; width: 80%; margin-right: 10px;"}>
          <i>
            In an experiment consisted of 10,000 games with 300 randomly moving particles (100 for
            each Rock, Paper, and Scissors) on a 1000x1000 canvas, the following outcomes were:
            <br /> Rock winning 3345 times, Paper winning 3309, and Scissors winning 3346. This
            suggests a balanced distribution, aligning closely with the expected equal probability
            of <strong>1/3</strong> for each team.
          </i>
        </p>
      </Show>
    </footer>
  );
};

export default Footer;
