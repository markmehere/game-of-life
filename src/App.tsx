import { Header } from "./components/header/Header";
import styled from "styled-components";
import { Board } from "components/board/Board";

const Container = styled.div``;

export function App() {
  return (
    <Container>
      <Header />
      <Board />
    </Container>
  );
}
