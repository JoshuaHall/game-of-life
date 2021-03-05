export const operations: [number, number][] = [
  [0, 1],
  [0, -1],
  [1, 1],
  [1, 0],
  [1, -1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

// For now, use a square grid
const gridSideLength = 20;

export const numRows = gridSideLength;
export const numCols = gridSideLength;

export type Grid = boolean[][];

export function runSimulation(grid: Grid): Grid {
  return grid.map((row, i) =>
    row.map((col, j) => {
      const neighbors: number = operations.filter(([a, b]) => {
        const newI = i + a;
        const newJ = j + b;

        return newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols && grid[newI][newJ];
      }).length;

      if (neighbors < 2 || neighbors > 3) {
        return false;
      }

      if (!col && neighbors === 3) {
        return true;
      }

      return col;
    }),
  );
}

function createGrid(cellPopulator: () => boolean): Grid {
  return Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => cellPopulator()));
}

export function emptyGrid(): Grid {
  return createGrid(() => false);
}

export function randomGrid(): Grid {
  return createGrid(() => Math.random() > 0.5);
}
