import { CParticle } from "../Classes/CParticle";
import { tBoundry, divideCanvasToSectors, eTeams, tTeamsCnt } from "./Util";

const W = 1000;
const H = 1000;
const TEAM_AMT = 100;
const TOATL = TEAM_AMT * 3;
const RADI = 15;
const GAMES = 1000;
let cParticlesList: CParticle[] = [];
const winnerCnt = [0, 0, 0];

const createParticles = (team: eTeams, amount: number, particleSector: tBoundry) => {
  for (let i = 0; i < amount; i++) {
    const p: CParticle = new CParticle(i, RADI, particleSector, W, H, team);
    cParticlesList.push(p);
  }
};

const runSim = () => {
  for (let g = 0; g < GAMES; g++) {
    console.log("START GAME:", g);
    cParticlesList = [];

    const particleSector: tBoundry[] = divideCanvasToSectors(3, W, H);
    createParticles(eTeams.ROCK, TEAM_AMT, particleSector[0]);
    createParticles(eTeams.PAPER, TEAM_AMT, particleSector[1]);
    createParticles(eTeams.SCISSORS, TEAM_AMT, particleSector[2]);
    let finish = false;
    while (!finish) {
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
        if (p.vel.x + p.vel.y === 0) {
          p.vel.x = 0.1;
          p.vel.y = 0.1;
        }
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
      }

      // Check Winner
      if (score.ROCK === TOATL) {
        finish = true;
        winnerCnt[0]++;
      } else if (score.PAPER === TOATL) {
        winnerCnt[1]++;
        finish = true;
      } else if (score.SCISSORS === TOATL) {
        winnerCnt[2]++;
        finish = true;
      }
    }
  }
};

const checkPropbilityToWin = async () => {
  const start = Date.now();
  await runSim();
  const end = Date.now();
  console.log(`Execution time: ${end - start} ms`);
  const p_rock = winnerCnt[0] / GAMES;
  const p_paper = winnerCnt[1] / GAMES;
  const p_scissors = winnerCnt[2] / GAMES;
  console.log(winnerCnt);
  console.log("rock:", p_rock);
  console.log("paper:", p_paper);
  console.log("scissors:", p_scissors);
};

// checkPropbilityToWin();
