import React, { useState, useMemo, useCallback, ReactElement } from 'react';

import { useInterval } from './hooks/useInterval';

import { initialGrid, randomGrid, runSimulation, numCols } from './Grid';
import { Cell } from './Cell';

export function toggle(bool: boolean): boolean {
  return !bool;
}

export function GameOfLife(): ReactElement {
  const [grid, setGrid] = useState(initialGrid);
  const [started, setStarted] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(750);

  const toggleStarted = useCallback(() => {
    setStarted(toggle);
  }, []);

  const randomize = useCallback(() => {
    setStarted(false);
    setGrid(randomGrid);
  }, []);

  const reset = useCallback(() => {
    setStarted(false);
    setGrid(initialGrid);
  }, []);

  const onChangeSimulationSpeed = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSimulationSpeed(event.target.valueAsNumber);
  }, []);

  useInterval(
    () => {
      setGrid(runSimulation);
    },
    started ? simulationSpeed : null,
  );

  const displayGrid = useMemo(
    () =>
      grid.map((row, i) =>
        row.map((col, j) => <Cell key={`${i}-${j}`} setGrid={setGrid} cellState={col} i={i} j={j} />),
      ),
    [grid],
  );

  return (
    <div className="columns is-centered">
      <div className="column is-narrow">
        <h3 className="title">Conway&apos;s Game of Life</h3>
        <div className="content">
          <p>This is an implementation of Conway&apos;s Game of Life using React.</p>
          <p>Click a cell to toggle whether it is alive or dead.</p>
          <p>These are the rules of the game:</p>
          <ul>
            <li>Any live cell with two or three live neighbours survives.</li>
            <li>Any dead cell with three live neighbours becomes a live cell.</li>
            <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
          </ul>
          <p>
            Reference:{' '}
            <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
              https://en.wikipedia.org/wiki/Conway&apos;s_Game_of_Life
            </a>
          </p>
        </div>

        <div className="field is-grouped">
          <p className="control">
            <button className={`button ${started ? 'is-warning' : 'is-primary'}`} onClick={toggleStarted}>
              {started ? 'Stop' : 'Start'}
            </button>
          </p>
          <p className="control">
            <button className="button is-info" onClick={randomize}>
              Randomize
            </button>
          </p>
          <p className="control">
            <button className="button is-danger" onClick={reset}>
              Reset
            </button>
          </p>
        </div>
        <div className="field">
          <label className="label">Time between simulation iterations: {simulationSpeed} ms</label>
          <p className="control">
            <input
              type="range"
              className="slider"
              step="50"
              min="100"
              max="2000"
              value={simulationSpeed}
              onChange={onChangeSimulationSpeed}
            />
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)` }}>{displayGrid}</div>
      </div>
    </div>
  );
}
