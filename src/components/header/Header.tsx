import { useAppDispatch } from "redux/hooks";
import styled from "styled-components";
import { next, reset } from "redux/cellsSlice/cellsSlice";

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30rem;
  height: 4rem;
`;

const Button = styled.button`
  font-size: 1.2rem;
`;

export function Header() {
  const dispatch = useAppDispatch();

  return (
    <Row>
      <Button aria-label="Reset" onClick={() => dispatch(reset())}>
        Reset
      </Button>
      <Button aria-label="Next generation" onClick={() => dispatch(next())}>
        Next generation
      </Button>
    </Row>
  );
}
