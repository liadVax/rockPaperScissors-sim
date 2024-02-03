import { CVector2D } from "./CVerctor2D";
import { COLORS, eTeams, tBoundry } from "../Utils/Util";

export class CParticle {
  id: number;
  diameter: number = 30;
  color: string = "white";
  pos: CVector2D;
  vel: CVector2D;
  acc: CVector2D;
  team: eTeams;
  canvasBoundryX: number;
  canvasBoundryY: number;
  constructor(
    id: number,
    radi: number,
    spwanBoundaries: tBoundry,
    canvasBoundryX: number,
    canvasBoundryY: number,
    peice: eTeams
  ) {
    this.id = id;
    if (radi > 15) this.diameter = radi * 2;
    this.pos = CVector2D.randomVector(
      spwanBoundaries.minX + this.diameter,
      spwanBoundaries.maxX - this.diameter,
      spwanBoundaries.minY + this.diameter,
      spwanBoundaries.maxY - this.diameter
    );
    this.vel = CVector2D.randomVector(-5, 5, -5, 5);
    this.acc = new CVector2D(0, 0);
    this.team = peice;
    this.color = COLORS[peice];
    this.canvasBoundryX = canvasBoundryX;
    this.canvasBoundryY = canvasBoundryY;
  }

  setCanvasBoundries(boundryX: number, boundryY: number) {
    this.canvasBoundryX = boundryX;
    this.canvasBoundryY = boundryY;
  }

  move() {
    // Fail Safe...
    if (isNaN(this.pos.x) || isNaN(this.pos.y) || isNaN(this.vel.x) || isNaN(this.vel.y)) {
      this.pos = new CVector2D(0, 0);
      this.vel = new CVector2D(1, 1);
      console.log("ERROR");
    }

    let boundriesCollis = false;

    if (this.pos.x >= this.canvasBoundryX - this.diameter || this.pos.x <= 0) {
      this.vel.x *= -1;
      boundriesCollis = true;
    }
    if (this.pos.y >= this.canvasBoundryY - this.diameter || this.pos.y <= 0) {
      this.vel.y *= -1;
      boundriesCollis = true;
    }

    // ACC IS NOT IN USE AT THE MOMENT.
    // this.vel = CVector2D.ADD(this.vel, this.acc);

    this.pos = CVector2D.ADD(this.pos, this.vel);

    // TO PREVENT PARTICLES THAT STUCK IN THE WALL AFTER COLLISION
    if (boundriesCollis) {
      if (this.pos.x >= this.canvasBoundryX - this.diameter) {
        this.pos.x = this.canvasBoundryX - this.diameter;
      } else if (this.pos.x <= 0) {
        this.pos.x = 0;
      } else if (this.pos.y >= this.canvasBoundryY - this.diameter) {
        this.pos.y = this.canvasBoundryY - this.diameter;
      } else if (this.pos.y <= 0) {
        this.pos.y = 0;
      }
    }
  }

  rockPaperScissors = (p: CParticle) => {
    switch (this.team) {
      case eTeams.ROCK:
        if (p.team == eTeams.SCISSORS) {
          p.team = eTeams.ROCK;
          p.color = this.color;
        } else if (p.team == eTeams.PAPER) {
          this.team = eTeams.PAPER;
          this.color = p.color;
        }
        break;
      case eTeams.PAPER:
        if (p.team == eTeams.ROCK) {
          p.team = eTeams.PAPER;
          p.color = this.color;
        } else if (p.team == eTeams.SCISSORS) {
          this.team = eTeams.SCISSORS;
          this.color = p.color;
        }
        break;
      case eTeams.SCISSORS:
        if (p.team == eTeams.PAPER) {
          p.team = eTeams.SCISSORS;
          p.color = this.color;
        } else if (p.team == eTeams.ROCK) {
          this.team = eTeams.ROCK;
          this.color = p.color;
        }
        break;
    }
  };

  checkCollision = (p: CParticle) => {
    if (this.team !== p.team) {
      const v = CVector2D.SUB(this.pos, p.pos);
      const dist = v.x * v.x + v.y * v.y;
      if (dist < this.diameter * p.diameter) {
        // Elastic collisions in two dimensions
        // Source: https://imada.sdu.dk/u/rolf/Edu/DM815/E10/2dcollisions.pdf
        const magV = Math.sqrt(dist);
        // Step 1: Find unit normal and unit tangent vectors.
        const unitNormal = CVector2D.DIV(v, magV);
        const unitTangent = unitNormal.getTangent();
        // Extra Step: For particles that overlap
        const correction = CVector2D.MULT(unitNormal, this.diameter);
        this.pos = CVector2D.ADD(p.pos, correction);
        // Step 2: Create the initial (before the collision) velocity vectors
        const a = this.vel;
        const b = p.vel;
        // Step 3: Project the velocity vectors onto the unit normal and unit tangent vectors
        const a_n = a.dot(unitNormal);
        const b_n = b.dot(unitNormal);
        const a_t = a.dot(unitTangent);
        const b_t = b.dot(unitTangent);
        // Step 5: Find the new normal velocities
        const a_n_final =
          (a_n * (this.diameter - p.diameter) + 2 * p.diameter * b_n) /
          (this.diameter + p.diameter);
        const b_n_final =
          (b_n * (p.diameter - this.diameter) + 2 * this.diameter * a_n) /
          (this.diameter + p.diameter);
        // Step 6: Convert the scalar normal and tangential velocities into vectors
        const a_n_after = CVector2D.MULT(unitNormal, a_n_final);
        const b_n_after = CVector2D.MULT(unitNormal, b_n_final);
        const a_t_after = CVector2D.MULT(unitTangent, a_t);
        const b_t_after = CVector2D.MULT(unitTangent, b_t);
        // Step 7: Find the final velocity vectors
        this.vel = CVector2D.ADD(a_n_after, a_t_after);
        p.vel = CVector2D.ADD(b_n_after, b_t_after);

        this.rockPaperScissors(p);
      }
    }
  };
}
