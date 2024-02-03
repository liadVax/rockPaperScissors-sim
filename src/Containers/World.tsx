/**
 * World Component:
 * - Manages the main simulation of particles on a canvas.
 * - Handles particle collisions, positions, and team interactions.
 * - Displays the canvas, particle components, score board, and winning modal.
 * - Utilizes GlobalDataProvider for shared state management.
 *
 * @component
 * @returns {JSX.Element} - The World component.
 */

import { Component, For, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import {
  divideCanvasToSectors,
  eTeams,
  MIN_H,
  MIN_W,
  RADI,
  tBoundry,
  tTeamsCnt,
} from "../Utils/Util";
import { CParticle } from "../Classes/CParticle";
import { Particle, ParticleProps } from "../Components/Particle";
import { useGlobalData } from "../Providers/GlobalDataProvider";
import Canvas from "../Components/Canvas";
import Controller from "./Controller";
import ScoreBoard from "../Components/ScoreBoard";
import WinningModal from "../Components/WinningModal";

const World: Component = () => {
  // State and signals
  const [particlesView, setParticlesView] = createSignal<ParticleProps[]>([]);
  const [isOpen, setIsOpen] = createSignal(false);
  const [winner, setWinner] = createSignal<string | undefined>(undefined);
  // Global data context
  const globalData = useGlobalData();
  // Dynamic team total calculation
  const teamsTotal = createMemo(
    () => globalData.teamCnt().ROCK + globalData.teamCnt().PAPER + globalData.teamCnt().SCISSORS
  );
  // Particles data
  const cParticlesList: CParticle[] = [];

  // Handle window resize
  const handleResize = () => {
    const width = window.innerWidth * 0.7 < MIN_W ? MIN_W : window.innerWidth * 0.7;
    const height = window.innerHeight * 0.65 < MIN_H ? MIN_H : window.innerHeight * 0.65;

    globalData.setWindowSize({ width, height });
  };

  // Create initial particles for each team
  const createParticles = (team: eTeams, amount: number, particleSector: tBoundry) => {
    for (let i = 0; i < amount; i++) {
      const p: CParticle = new CParticle(
        i,
        RADI,
        particleSector,
        globalData.windowSize().width,
        globalData.windowSize().height,
        team
      );
      cParticlesList.push(p);
    }
  };

  // Initialize particles and set initial view
  const InitParticles = () => {
    cParticlesList.splice(0, cParticlesList.length);
    const initParticlesView: ParticleProps[] = [];

    const particleSector: tBoundry[] = divideCanvasToSectors(
      3,
      globalData.windowSize().width,
      globalData.windowSize().height
    );
    createParticles(eTeams.ROCK, globalData.teamCnt().ROCK, particleSector[0]);
    createParticles(eTeams.PAPER, globalData.teamCnt().PAPER, particleSector[1]);
    createParticles(eTeams.SCISSORS, globalData.teamCnt().SCISSORS, particleSector[2]);

    cParticlesList.map((p: CParticle, i: number) =>
      initParticlesView.push({
        id: i,
        pos: { x: p.pos.x, y: p.pos.y },
        team: p.team,
        color: p.color,
        dim: p.diameter,
      })
    );

    setIsOpen(false);
    setWinner(undefined);
    setParticlesView(initParticlesView);
  };

  // Handle component mount
  onMount(() => {
    window.addEventListener("resize", handleResize);
    const width = window.innerWidth * 0.7 < MIN_W ? MIN_W : window.innerWidth * 0.7;
    const height = window.innerHeight * 0.65 < MIN_H ? MIN_H : window.innerHeight * 0.65;
    globalData.setWindowSize({ width, height });
    InitParticles();
  });

  // Update particles positions, check for collisions and score
  const updateParticles = () => {
    if (!globalData.pause()) {
      const newParts = [];
      const score: tTeamsCnt = { ROCK: 0, PAPER: 0, SCISSORS: 0 };

      // Particles Collision
      for (let i = 0; i < cParticlesList.length; i++) {
        const p_i = cParticlesList[i];
        for (let j = i + 1; j < cParticlesList.length; j++) {
          const p_j = cParticlesList[j];
          p_i.checkCollision(p_j);
        }
      }

      // Particle Boundries and Position
      for (const p of cParticlesList) {
        p.setCanvasBoundries(globalData.windowSize().width, globalData.windowSize().height);
        p.move();
        switch (p.team) {
          case eTeams.ROCK:
            score.ROCK++;
            break;
          case eTeams.PAPER:
            score.PAPER++;
            break;
          case eTeams.SCISSORS:
            score.SCISSORS++;
            break;
        }
        newParts.push({ id: p.id, dim: p.diameter, pos: p.pos, color: p.color, team: p.team });
      }

      // Check Winner
      if (winner() === undefined) {
        if (score.ROCK === teamsTotal()) {
          setWinner("🤘 ROCK 🤘");
          setIsOpen(true);
        } else if (score.PAPER === teamsTotal()) {
          setWinner("📄 PAPER 📄");
          setIsOpen(true);
        } else if (score.SCISSORS === teamsTotal()) {
          setWinner("✂️ SCISSORS ✂️");
          setIsOpen(true);
        } else {
          setWinner(undefined);
        }
      }

      globalData.setTeamCnt(score);
      setParticlesView(newParts);
    }
  };

  // Update the particle position periodically
  const updateInterval = setInterval(updateParticles, 24);

  // Cleanup the interval and event listener when the component unmounts
  onCleanup(() => {
    clearInterval(updateInterval);
    window.removeEventListener("resize", handleResize);
  });

  return (
    <div
      style={`
        display: flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-around;
        margin-top:12px;`}
    >
      <div
        style={`display: flex;
               flex-direction: column;
               align-items: strech;
               justify-content: center;`}
      >
        <ScoreBoard
          teamCnt={globalData.teamCnt()}
          total={teamsTotal()}
          width={globalData.windowSize().width}
        />
        <div
          style={`display:flex;
                 flex-direction:row;
                 align-items:flex-start;
                 flex-basis:0;
                 flex-wrap:no-wrap;
                 `}
        >
          <Canvas width={globalData.windowSize().width} height={globalData.windowSize().height}>
            <For each={particlesView()}>
              {(p) => {
                return <Particle id={p.id} dim={p.dim} color={p.color} team={p.team} pos={p.pos} />;
              }}
            </For>
          </Canvas>
          <div>
            <Controller handleRestart={InitParticles} />
          </div>
        </div>
      </div>
      <WinningModal isOpen={isOpen()} text={winner()} />
    </div>
  );
};
export default World;
