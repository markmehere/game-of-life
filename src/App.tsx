import { Counter } from "./components/counter/Counter";
import styled from "styled-components";
import { color } from "./colors";

const Heading = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: ${color.heading};
`;

export function App() {
  return (
    <div className="App">
      <Heading>Learn React, Redux and Thunk</Heading>
      <Counter />
    </div>
  );
}
