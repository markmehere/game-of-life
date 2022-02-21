import { CellBoard } from "shared/types";
import { clone } from "shared/utils";
import {
  getNeighboursAlive,
  getWrappedSiblingNeigboursAlive,
  isCellAlive,
  regenerate,
} from "./regenerate";

describe("regenerate", () => {
  const threeSquareFull: CellBoard = Array(3)
    .fill([])
    .map(() => Array(3).fill(true));
  const sixSquareExample: CellBoard = Array(6)
    .fill([])
    .map(() => Array(6).fill(false));
  sixSquareExample[1][2] = true;
  sixSquareExample[2][3] = true;
  sixSquareExample[3][1] = true;
  sixSquareExample[3][2] = true;
  sixSquareExample[3][3] = true;

  const summariseRow = (row: boolean[], r: number) =>
    row
      .map((cell, c) => (cell ? `(${r},${c})` : null))
      .filter((x) => x)
      .join(",");

  const summariseBoard = (board: CellBoard) =>
    board
      .map((row, r) => summariseRow(row, r))
      .filter((x) => x)
      .join(";");

  describe("summariseBoard() (test utility)", () => {
    it("summarises example correctly", () => {
      expect(summariseBoard(sixSquareExample)).toBe(
        "(1,2);(2,3);(3,1),(3,2),(3,3)"
      );
    });
  });

  describe("isCellAlive()", () => {
    it("a cell with fewer than two live neighbours dies of under-population", () => {
      expect(isCellAlive(true, 1)).toBe(false);
      expect(isCellAlive(true, 0)).toBe(false);
    });

    it("a cell with 2 or 3 live neighbours lives on to the next generation", () => {
      expect(isCellAlive(true, 2)).toBe(true);
      expect(isCellAlive(true, 3)).toBe(true);
    });

    it("a cell with more than 3 live neighbours dies of overcrowding", () => {
      expect(isCellAlive(true, 4)).toBe(false);
      expect(isCellAlive(true, 5)).toBe(false);
      expect(isCellAlive(true, 6)).toBe(false);
      expect(isCellAlive(true, 7)).toBe(false);
      expect(isCellAlive(true, 8)).toBe(false);
      expect(isCellAlive(true, 9)).toBe(false); /* 9 neighbours is impossible */
    });

    it("a cell with exactly 3 live neighbours comes to life", () => {
      expect(isCellAlive(false, 3)).toBe(true);
    });

    it("no cell other than one with 3 live neighbours comes to life", () => {
      expect(isCellAlive(false, 0)).toBe(false);
      expect(isCellAlive(false, 1)).toBe(false);
      expect(isCellAlive(false, 2)).toBe(false);
      expect(isCellAlive(false, 4)).toBe(false);
      expect(isCellAlive(false, 5)).toBe(false);
      expect(isCellAlive(false, 6)).toBe(false);
      expect(isCellAlive(false, 7)).toBe(false);
      expect(isCellAlive(false, 8)).toBe(false);
      expect(isCellAlive(false, 9)).toBe(
        false
      ); /* 9 neighbours is impossible */
    });
  });

  describe("getNeighboursAlive()", () => {
    it("correctly calculates alive neighbours - center of 3x3 full", () => {
      expect(getNeighboursAlive(threeSquareFull, { r: 1, c: 1 })).toBe(8);
    });

    it("correctly calculates alive neighbours - top-left of 3x3 full", () => {
      expect(getNeighboursAlive(threeSquareFull, { r: 0, c: 0 })).toBe(3);
    });

    it("correctly calculates alive neighbours - outside diagonally from top-left tile 3x3 full", () => {
      expect(getNeighboursAlive(threeSquareFull, { r: -1, c: -1 })).toBe(1);
    });

    it("correctly calculates alive neighbours - outside left from top-left tile 3x3 full", () => {
      expect(getNeighboursAlive(threeSquareFull, { r: 0, c: -1 })).toBe(2);
    });

    it("correctly calculates alive neighbours - outside left from top-left tile 3x3 full (r: 1, c: 0) cleared", () => {
      const clonedBoard = clone(threeSquareFull);
      clonedBoard[1][0] = false;
      expect(getNeighboursAlive(clonedBoard, { r: 0, c: -1 })).toBe(1);
    });

    it("correctly calculates alive neighbours - outside left from top-left tile 3x3 full (r: 0, c: 1) cleared", () => {
      const clonedBoard = clone(threeSquareFull);
      clonedBoard[0][1] = false;
      expect(getNeighboursAlive(clonedBoard, { r: 0, c: -1 })).toBe(2);
    });

    it("accepts far-out co-ordinates", () => {
      expect(getNeighboursAlive(threeSquareFull, { r: -4, c: -1 })).toBe(0);
      expect(getNeighboursAlive(threeSquareFull, { r: 5, c: 5 })).toBe(0);
    });
  });

  describe("getWrappedSiblingNeigboursAlive()", () => {
    it("returns 0 for non-edge co-ordinates", () => {
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: -1, c: 1 })
      ).toBe(0);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 1, c: 1 })
      ).toBe(0);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 3, c: 1 })
      ).toBe(0);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: -1, c: 0 })
      ).toBe(0);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 3, c: 0 })
      ).toBe(0);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 0, c: -1 })
      ).toBe(0);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 0, c: 3 })
      ).toBe(0);
    });

    it("returns 0 for corner co-ordinates", () => {
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 0, c: 0 })
      ).toBe(0);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 2, c: 2 })
      ).toBe(0);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 0, c: 2 })
      ).toBe(0);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 2, c: 0 })
      ).toBe(0);
    });

    it("returns 3 for edge tiles (except corners) on full board", () => {
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 0, c: 1 })
      ).toBe(3);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 1, c: 0 })
      ).toBe(3);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 1, c: 2 })
      ).toBe(3);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 2, c: 1 })
      ).toBe(3);
    });

    it("returns 3 for edge tiles (except corners) on full board", () => {
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 0, c: 1 })
      ).toBe(3);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 1, c: 0 })
      ).toBe(3);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 1, c: 2 })
      ).toBe(3);
      expect(
        getWrappedSiblingNeigboursAlive(threeSquareFull, { r: 2, c: 1 })
      ).toBe(3);
    });

    it("returns correct wrapped neighbour if top-right is off", () => {
      const clonedBoard = clone(threeSquareFull);
      clonedBoard[0][2] = false; /* top-right corner off */
      expect(
        getWrappedSiblingNeigboursAlive(
          clonedBoard,
          { r: 0, c: 1 } /* top-center */
        )
      ).toBe(3); /* the wrapped neighbour is bottom-center - so all three */
      expect(
        getWrappedSiblingNeigboursAlive(
          clonedBoard,
          { r: 1, c: 0 } /* left-center */
        )
      ).toBe(2); /* the wrapped neighbour is right-center - so only two */
      expect(
        getWrappedSiblingNeigboursAlive(
          clonedBoard,
          { r: 1, c: 2 } /* right-center */
        )
      ).toBe(3); /* the wrapped neighbour is left-center - so all three */
      expect(
        getWrappedSiblingNeigboursAlive(
          clonedBoard,
          { r: 2, c: 1 } /* bottom-center */
        )
      ).toBe(2); /* the wrapped neighbour is top-center - so only two */
    });
  });

  describe("regenerate", () => {
    it("example after one step", () => {
      const oneStep = regenerate(sixSquareExample);
      expect(summariseBoard(oneStep)).toBe("(2,1),(2,3);(3,2),(3,3);(4,2)");
    });

    it("example after two steps", () => {
      const oneStep = regenerate(sixSquareExample);
      const twoSteps = regenerate(oneStep);
      expect(summariseBoard(twoSteps)).toBe("(2,3);(3,1),(3,3);(4,2),(4,3)");
    });

    it("example after three steps", () => {
      const oneStep = regenerate(sixSquareExample);
      const twoSteps = regenerate(oneStep);
      const threeSteps = regenerate(twoSteps);
      expect(summariseBoard(threeSteps)).toBe("(2,2);(3,3),(3,4);(4,2),(4,3)");
    });

    it("example after four steps", () => {
      const oneStep = regenerate(sixSquareExample);
      const twoSteps = regenerate(oneStep);
      const threeSteps = regenerate(twoSteps);
      const fourSteps = regenerate(threeSteps);
      expect(summariseBoard(fourSteps)).toBe("(2,3);(3,4);(4,2),(4,3),(4,4)");
    });

    it("3x3 wrapping check", () => {
      const threeSquareRightOnly = [
        [false, false, true],
        [false, false, true],
        [false, false, true],
      ];
      // prettier-ignore
      const threeSquareExpectation = [
        [false, false, false],
        [ true,  true,  true], /* left-most from wrapping */
        [false, false, false],
      ];
      expect(regenerate(threeSquareRightOnly)).toEqual(threeSquareExpectation);
    });
  });
});
