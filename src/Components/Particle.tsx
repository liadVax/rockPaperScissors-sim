import { Component, Match, Switch, createSignal, onCleanup, onMount } from "solid-js";
import { tVector2D, eTeams } from "../Utils/Util";

export type ParticleProps = {
  id: number;
  pos: tVector2D;
  color: string;
  team: eTeams;
  dim: number;
};

export const Particle: Component<ParticleProps> = (props) => {
  return (
    <div
      style={`
      display:flex;
      flex-direction: row;
      justify-content:center;
      align-items:center;
      text-align:center;
      left: ${props.pos.x}px;
      position: absolute;
      top: ${props.pos.y}px;
      font-size:${props.dim / 1.75}px;
      width: ${props.dim - 2}px;
      height: ${props.dim - 2}px;
      background-color: ${props.color ?? "white"};
      border-radius: 50%;
      border: 2px solid black;
  `}
    >
      <Switch>
        <Match when={props.team === eTeams.ROCK}>⛰️</Match>
        <Match when={props.team === eTeams.PAPER}>📄</Match>
        <Match when={props.team === eTeams.SCISSORS}>✂️</Match>
      </Switch>
    </div>
  );
};
