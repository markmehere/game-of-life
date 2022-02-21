import { useState } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
} from "slices/counterSlice/counterSlice";
import styled from "styled-components";
import { color } from "colors";

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  appearance: none;
  background: none;
  font-size: 1.2rem;
  padding: 0.5rem 2rem;
  outline: none;
  border: 2px solid transparent;
  color: ${color.button};
  cursor: pointer;
  background-color: ${color.buttonBackground};
  border-radius: 2px;
  transition: all 0.15s;
  margin-left: 1rem;
  margin-right: 1rem;

  &:hover,
  &:focus {
    border: 2px solid ${color.border};
  }

  &:active {
    background-color: ${color.activeBackground};
  }
`;

const Value = styled.span`
  font-size: 78px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 2px;
  font-family: "Courier New", Courier, monospace;
`;

const Textbox = styled.input`
  font-size: 32px;
  padding: 2px;
  width: 64px;
  text-align: center;
  margin-right: 4px;
`;

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <Row>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
        <Value>{count}</Value>
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
      </Row>
      <Row>
        <Textbox
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <Button onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </Button>
        <Button onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          Add If Odd
        </Button>
      </Row>
    </div>
  );
}
