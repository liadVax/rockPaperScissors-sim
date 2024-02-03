import { Component } from "solid-js";

const Footer: Component = () => {
  return (
    <footer
      style={`
         display:flex;
         justify-content:center;
         align-items: center;
         text-align: center;
         padding: 10px;
         background-color: #f0f0f0;
         position: fixed;
         bottom: 0;
         width: 100%;`}
    >
      <p style={"font-size:14px;width: 80%;"}>
        <i>
          In an experiment consisted of 1000 games with 300 randomly moving particles (100 for each
          Rock, Paper, and Scissors) on a 1000x1000 canvas, the following outcomes were:
          <br /> Rock winning 354 times, Paper winning 306, and Scissors winning 340. This suggests
          a balanced distribution, aligning closely with the expected equal probability of{" "}
          <strong>1/3</strong> for each team.
        </i>
      </p>
    </footer>
  );
};

export default Footer;
