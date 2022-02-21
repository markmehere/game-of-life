import { useAppDispatch } from "redux/hooks";
import styled from "styled-components";
import { toggle } from "redux/cellsSlice/cellsSlice";
import { color } from "shared/colors";
import { BOARD_COLS } from "shared/constants";

interface ButtonStyleProps {
  alive: boolean;
}

const CellButton = styled.button<ButtonStyleProps>`
  background-color: ${(props) =>
    props.alive ? color.cellAlive : color.cellDead};
  border: 1px solid white;
  width: ${30 / BOARD_COLS}rem;
  height: ${30 / BOARD_COLS}rem;
`;

export interface CellProps {
  value: boolean;
  row: number;
  col: number;
}

export function Cell({ row, col, value }: CellProps) {
  const dispatch = useAppDispatch();

  return (
    <CellButton
      alive={value}
      aria-pressed={value}
      aria-label={`Cell ${row},${col}`}
      onClick={() => dispatch(toggle({ r: row, c: col }))}
    />
  );
}
