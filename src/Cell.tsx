import React, { ReactElement, useCallback } from 'react';

import { Grid } from './Grid';
import { toggle } from './GameOfLife';

interface CellComponentProps {
  cellState: boolean;
  i: number;
  j: number;
  setGrid: React.Dispatch<React.SetStateAction<Grid>>;
}

function CellComponent({ cellState, i, j, setGrid }: CellComponentProps): ReactElement<CellComponentProps> {
  const onClick = useCallback(
    () =>
      setGrid((tempGrid) =>
        tempGrid.map((tempRow, rowIndex) =>
          tempRow.map((tempCol, colIndex) => (i === rowIndex && j === colIndex ? toggle(tempCol) : tempCol)),
        ),
      ),
    // In this intance, none of the dependencies will ever change, so there is no need to include them
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <div className={`cell ${cellState ? 'alive' : 'dead'}`} onClick={onClick} />;
}

export const Cell = React.memo(CellComponent);
