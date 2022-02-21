import { useAppSelector } from "redux/hooks";
import styled from "styled-components";
import { selectBoard } from "redux/cellsSlice/cellsSlice";
import { Cell } from "components/board/Cell";

const Container = styled.div`
  border: 2px solid black;
  width: 30rem;
`;

const Row = styled.div``;

export function Board() {
  const board = useAppSelector(selectBoard);

  return (
    <Container>
      {board.map((row, r) => (
        <Row key={`row${r}`}>
          {row.map((cell, c) => (
            <Cell key={`cell${r},${c}`} value={cell} row={r} col={c} />
          ))}
        </Row>
      ))}
    </Container>
  );
}
