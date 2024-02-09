// UTILITY FUNCTIONS
export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export const divideCanvasToSectors = (
  sectorAmt: number,
  canvasW: number,
  canvasH: number
): tBoundry[] => {
  const rows = 2;
  const cols = Math.ceil(sectorAmt / rows);
  const secH = Math.floor(canvasH / rows);
  const secW = Math.floor(canvasW / cols);

  const boundaries = [];

  const sectorsInFirstRow = Math.min(sectorAmt, cols);
  const sectorsInSecondRow = sectorAmt - sectorsInFirstRow;

  for (let h = 0; h < rows; h++) {
    for (let w = 0; w < (h === 0 ? sectorsInFirstRow : sectorsInSecondRow); w++) {
      const minX = w * secW;
      const maxX = (w + 1) * secW;
      const minY = h * secH;
      const maxY = (h + 1) * secH;

      boundaries.push({ minX, maxX, minY, maxY });
    }
  }

  if (sectorsInSecondRow > 0) {
    const offset = (canvasW - secW * sectorsInSecondRow) / (sectorsInSecondRow + 1);

    for (let w = 0; w < sectorsInSecondRow; w++) {
      const index = sectorsInFirstRow + w;
      const offsetMinX = offset + w * (secW + offset);
      const offsetMaxX = offsetMinX + secW;
      boundaries[index].minX = offsetMinX;
      boundaries[index].maxX = Math.min(offsetMaxX, canvasW);
    }
  }

  return boundaries;
};

// TYPES AND ENUMS
export type tBoundry = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export type tVector2D = {
  x: number;
  y: number;
};

export enum eTeams {
  ROCK = 0, //"🤘",
  PAPER = 1, //"📄",
  SCISSORS = 2, //"✂️",
}

export type tWindowSize = {
  width: number;
  height: number;
};

export type tTeamsCnt = { ROCK: number; PAPER: number; SCISSORS: number };

// DEFINITIONS AND CONSTANTS
export const COLORS = ["LightGreen", "LemonChiffon", "LightCoral"];

export const MIN_W = 325;
export const MIN_H = 475;
export const RADI_WIDE = 15;
export const RADI_NARROW = 10;
