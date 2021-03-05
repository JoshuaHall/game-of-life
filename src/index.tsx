import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import { GameOfLife } from './GameOfLife';
import { emptyGrid } from './Grid';

const initialGrid = emptyGrid();

ReactDOM.render(
  <React.StrictMode>
    <GameOfLife initialGrid={initialGrid} hasStarted={false} simulationSpeedMs={750} />
  </React.StrictMode>,
  document.getElementById('root'),
);
