import { Component, For } from "solid-js";
import { COLORS, tTeamsCnt } from "../Utils/Util";

const ScoreBoard: Component<{
  teamCnt: tTeamsCnt;
  total: number;
}> = (props) => {
  const teamSymbols = { ROCK: "🤘", PAPER: "📄", SCISSORS: "✂️" };
  return (
    <div
      style={`background:AliceBlue;
      border-width:6px;
      margin:2px 0px;
      border-style:ridge;
      border-color:black;`}
    >
      <For each={Object.entries(teamSymbols)}>
        {([k, v], inx) => {
          return (
            <div
              style={`

                border:0px;
                border-bottom:1px;
                border-style:solid;
                border-color:black;
                display:flex;
                `}
            >
              <div
                style={`width:30px;
                        padding:1px 0px;
                        background:${COLORS[inx()]};
                        text-align:left;`}
              >
                {v}
              </div>
              <div
                style={`
                      background:${COLORS[inx()]};
                      width:${
                        (props.teamCnt[k.toString() as keyof tTeamsCnt] / props.total) * 100
                      }%;
                      min-width:15px;
                      text-align:right;
                      font-weight: bold;
                      padding:1px 0px;
                      padding-right:2px;
                      border-right:3px solid black;
                      `}
              >
                {props.teamCnt[k.toString() as keyof tTeamsCnt]}
              </div>
            </div>
          );
        }}
      </For>
    </div>
  );
};
export default ScoreBoard;
