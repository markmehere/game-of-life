import { CellBoard, CellPoint } from "shared/types";

export function isCellAlive(
  initial: boolean,
  neighboursAlive: number
): boolean {
  /* A cell 2 or 3 live neighboaurs lives on to the next generation */
  if (initial && (neighboursAlive === 2 || neighboursAlive === 3)) return true;

  /* An empty cell with exactly three live neighbours comes to life */
  if (!initial && neighboursAlive === 3) return true;

  return false;
}

export function getNeighboursAlive(board: CellBoard, point: CellPoint): number {
  let count = 0;

  for (let r = point.r - 1; r <= point.r + 1; r++) {
    for (let c = point.c - 1; c <= point.c + 1; c++) {
      if (!(r === point.r && c === point.c) && board[r] && board[r][c]) count++;
    }
  }

  return count;
}

export function getWrappedSiblingNeigboursAlive(
  board: CellBoard,
  cp: CellPoint
) {
  const r = cp.r,
    c = cp.c;
  const boardRows = board.length;
  const boardCols = board[0].length;
  const rowEdge = r === 0 || r === boardRows - 1;
  const columnEdge = c === 0 || c === boardCols - 1;

  if (r < 0 || r >= boardRows) return 0;
  if (c < 0 || c >= boardCols) return 0;
  if (rowEdge && !columnEdge) {
    if (r === 0) {
      return getNeighboursAlive(board, { r: boardRows, c });
    } else {
      return getNeighboursAlive(board, { r: -1, c });
    }
  }
  if (columnEdge && !rowEdge) {
    if (c === 0) {
      return getNeighboursAlive(board, { r, c: boardCols });
    } else {
      return getNeighboursAlive(board, { r, c: -1 });
    }
  }

  return 0;
}

export function regenerate(board: CellBoard): CellBoard {
  return board.map((row, r) =>
    row.map(
      (cell, c) =>
        isCellAlive(cell, getNeighboursAlive(board, { r, c })) ||
        isCellAlive(false, getWrappedSiblingNeigboursAlive(board, { r, c }))
    )
  );
}
