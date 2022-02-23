import { CellBoard } from "shared/types";
import { clone } from "shared/utils";
import {
  regenerate,
} from "./regenerate";

describe("regenerate", () => {
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

  describe("regenerate()", () => {
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
