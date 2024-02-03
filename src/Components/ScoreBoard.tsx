import { Component, For } from "solid-js";
import { COLORS, tTeamsCnt, TEAM_SYM } from "../Utils/Util";

const ScoreBoard: Component<{
  teamCnt: tTeamsCnt;
  total: number;
  width: number;
}> = (props) => {
  return (
    <div
      style={`background:AliceBlue;
      width:${props.width}px;
      border-width:6px;
      margin:2px 0px;
      border-style:ridge ;
      border-color:black;`}
    >
      <For each={TEAM_SYM}>
        {(t, inx) => {
          return (
            <div
              style={`
                width:${props.width}px;
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
                {t}
              </div>
              <div
                style={`
                      background:${COLORS[inx()]};
                      width:${
                        (props.teamCnt[t == "🤘" ? "ROCK" : t == "📄" ? "PAPER" : "SCISSORS"] /
                          props.total) *
                        100
                      }%;
                      min-width:15px;
                      text-align:right;
                      font-weight: bold;
                      padding:1px 0px;
                      padding-right:2px;
                      border-right:3px solid black;
                      `}
              >
                {props.teamCnt[t == "🤘" ? "ROCK" : t == "📄" ? "PAPER" : "SCISSORS"]}
              </div>
            </div>
          );
        }}
      </For>
    </div>
  );
};
export default ScoreBoard;
