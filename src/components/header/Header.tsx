import React from "react";
import { useAppDispatch } from "redux/hooks";
import styled from "styled-components";
import { next, reset } from "redux/cellsSlice/cellsSlice";
import { useCallback } from "react";

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
  const onReset = useCallback(() => dispatch(reset()), [dispatch]);
  const onNext = useCallback(() => dispatch(next()), [dispatch]);

  return (
    <Row>
      <Button aria-label="Reset" onClick={onReset}>
        Reset
      </Button>
      <Button aria-label="Generation" onClick={onNext}>
        Generation
      </Button>
    </Row>
  );
}
