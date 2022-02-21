import { screen as s, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { Board } from "./Board";

jest.mock("shared/constants", () => ({
  BOARD_COLS: 5,
  BOARD_ROWS: 3,
}));

describe("<Board />", () => {
  it("matches snapshot", async () => {
    const wrapper = render(
      <Provider store={store}>
        <Board />
      </Provider>
    );
    const buttons = await s.findAllByRole("button");
    expect(buttons).toHaveLength(15);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
