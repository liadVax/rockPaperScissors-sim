import { randomNumber } from "../Utils/Util";

export class CVector2D {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  static ADD(vec1: CVector2D, vec2: CVector2D): CVector2D {
    return new CVector2D(vec1.x + vec2.x, vec1.y + vec2.y);
  }

  static MULT(vec: CVector2D, scalar: number): CVector2D {
    return new CVector2D(vec.x * scalar, vec.y * scalar);
  }

  static DIV(vec: CVector2D, scalar: number): CVector2D {
    return new CVector2D(vec.x / scalar, vec.y / scalar);
  }

  static SUB(vec1: CVector2D, vec2: CVector2D): CVector2D {
    return new CVector2D(vec1.x - vec2.x, vec1.y - vec2.y);
  }

  dot(vec: CVector2D): number {
    return this.x * vec.x + this.y * vec.y;
  }

  //   Tangent vector is a vector that is tan to a curve or surface at a given point.
  getTangent(): CVector2D {
    return new CVector2D(-this.y, this.x);
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  static randomVector(minX: number, maxX: number, minY: number, maxY: number): CVector2D {
    return new CVector2D(randomNumber(minX, maxX), randomNumber(minY, maxY));
  }
}
