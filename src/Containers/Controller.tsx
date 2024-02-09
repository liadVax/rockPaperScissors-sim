import { Component, createSignal, onMount } from "solid-js";
import { useGlobalData } from "../Providers/GlobalDataProvider";
import styles from "../App.module.css";

const Controller: Component<{ handleRestart: () => void }> = (props) => {
  const globalData = useGlobalData();
  const [rock, setRock] = createSignal<number>(0);
  const [paper, setPaper] = createSignal<number>(0);
  const [scissors, setScissors] = createSignal<number>(0);

  onMount(() => {
    setRock(globalData.teamCnt().ROCK);
    setPaper(globalData.teamCnt().PAPER);
    setScissors(globalData.teamCnt().SCISSORS);
  });

  return (
    <div
      style={`display:flex;
              flex-direction:column;
              align-items:stretch;
              padding:8px 16px;
              border:6px ridge black;
              background:AliceBlue;
              text-align:center;
              margin:2px;`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          globalData.setTeamCnt({ ROCK: rock(), PAPER: paper(), SCISSORS: scissors() });
          globalData.setPause(false);
          props.handleRestart();
        }}
      >
        <p style={`padding:2px 0px;border-bottom:6px double black;`}>
          <strong>SETUP</strong>
        </p>
        <div style={`display:flex; align-items:center;`}>
          <label class={styles.Label} for="rock">
            🤘:
          </label>
          <input
            required
            type="number"
            class={styles.Input}
            id="rock"
            name="Rock"
            value={rock()}
            max={500}
            onInput={(e) => {
              const rock = parseInt(e.target.value);
              setRock(Number.isNaN(rock) ? 0 : rock);
            }}
          />
        </div>
        <div style={`display:flex; align-items:center;`}>
          <label class={styles.Label} for="paper">
            📄:
          </label>
          <input
            required
            type="number"
            class={styles.Input}
            id="paper"
            name="Paper"
            value={paper()}
            max={500}
            onInput={(e) => {
              const paper = parseInt(e.target.value);
              setPaper(Number.isNaN(paper) ? 0 : paper);
            }}
          />
        </div>
        <div style={`display:flex; align-items:center;`}>
          <label class={styles.Label} for="scissors">
            ✂️:
          </label>
          <input
            required
            type="number"
            class={styles.Input}
            id="scissors"
            name="Scissors"
            value={scissors()}
            max={500}
            onInput={(e) => {
              const scissors = parseInt(e.target.value);
              setScissors(Number.isNaN(scissors) ? 0 : scissors);
            }}
          />
        </div>
        <button
          type="submit"
          style={`padding:8px;
         margin:6px 0px;
         width:125px;
         cursor:pointer;`}
        >
          RESTART
        </button>
      </form>
      <button
        style={`padding:8px;
                width:125px;
                cursor:pointer;`}
        onClick={() => {
          globalData.setPause(!globalData.pause());
        }}
      >
        {globalData.pause() === false ? "PAUSE" : "RESUME"}
      </button>
    </div>
  );
};

export default Controller;
