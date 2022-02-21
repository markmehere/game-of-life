import cellsReducer, {
  reset,
  next,
  toggle,
  revise,
  CellsState,
} from "./cellsSlice";

describe("cellsSlice", () => {
  const threeByThreeEmpty: CellsState = {
    board: Array(3)
      .fill([])
      .map(() => Array(3).fill(false)),
  };

  const threeByThreeFull: CellsState = {
    board: Array(3)
      .fill([])
      .map(() => Array(3).fill(true)),
  };

  it("intializes correctly", () => {
    const initialState = cellsReducer(undefined, { type: "unknown" });
    expect(initialState.board).toBeDefined();
    expect(initialState.board.length).toBeGreaterThan(0);
    expect(initialState.board[0].length).toBeGreaterThan(0);
    expect(initialState.board[0][0]).toBe(false);
  });

  it("has uniform length rows", () => {
    const initialState = cellsReducer(undefined, { type: "unknown" });
    initialState.board.forEach((row) =>
      expect(row.length).toBe(initialState.board.length)
    );
  });

  it("toggles on correctly", () => {
    const actual = cellsReducer(threeByThreeEmpty, toggle({ r: 1, c: 2 }));
    expect(actual.board[1][2]).toBe(true);
  });

  it("toggles on and off correctly", () => {
    const firstResult = cellsReducer(threeByThreeEmpty, toggle({ r: 1, c: 2 }));
    expect(firstResult.board[1][2]).toBe(true);
    const secondResult = cellsReducer(firstResult, toggle({ r: 1, c: 2 }));
    expect(secondResult.board[1][2]).toBe(false);
  });

  it("remembers previous toggles", () => {
    const firstResult = cellsReducer(threeByThreeEmpty, toggle({ r: 2, c: 2 }));
    expect(firstResult.board[2][2]).toBe(true);
    const secondResult = cellsReducer(firstResult, toggle({ r: 1, c: 2 }));
    expect(secondResult.board[1][2]).toBe(true);
    expect(firstResult.board[2][2]).toBe(true);
  });

  it("resets correctly", () => {
    const actual = cellsReducer(threeByThreeFull, reset());
    expect(actual.board[1][2]).toBe(false);
    expect(actual.board[2][2]).toBe(false);
  });

  it("revises correctly", () => {
    const actual = cellsReducer(
      threeByThreeEmpty,
      revise(threeByThreeFull.board)
    );
    expect(actual.board[1][2]).toBe(true);
    expect(actual.board[2][2]).toBe(true);
    expect(actual.board).toEqual(threeByThreeFull.board);
  });

  it("runs next generation correctly", () => {
    let cells = cellsReducer(threeByThreeEmpty, toggle({ r: 1, c: 1 }));
    cells = cellsReducer(cells, toggle({ r: 0, c: 1 }));
    cells = cellsReducer(cells, toggle({ r: 2, c: 1 }));
    const nextThunk = next();
    const dispatch = jest.fn();
    nextThunk(dispatch, () => ({ cells }), null);
    expect(dispatch.mock.calls[0][0].payload).toEqual([
      [false, false, false],
      [true, true, true],
      [false, false, false],
    ]);
  });
});
