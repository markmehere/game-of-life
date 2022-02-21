import { screen as s, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { CellBoard } from "shared/types";
import { Cell } from "./Cell";
import * as hooks from "redux/hooks";

describe("<Cell />", () => {
  it("matches snapshot when dead", async () => {
    const wrapper = render(
      <Provider store={store}>
        <Cell value={false} row={1} col={2} />
      </Provider>
    );
    const cellButton = await s.findByRole("button");
    expect(cellButton).toHaveAttribute("aria-pressed", "false");
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("matches snapshot when alive", async () => {
    const wrapper = render(
      <Provider store={store}>
        <Cell value={true} row={1} col={2} />
      </Provider>
    );
    const cellButton = await s.findByRole("button");
    expect(cellButton).toHaveAttribute("aria-pressed", "true");
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("toggles correctly", async () => {
    const spy = jest.spyOn(hooks, "useAppDispatch");
    const mockDispatch = jest.fn();
    spy.mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Cell value={false} row={1} col={2} />
      </Provider>
    );
    const cellButton = await s.findByRole("button");
    userEvent.click(cellButton);
    expect(mockDispatch.mock.calls[0][0].payload).toEqual({
      c: 2,
      r: 1,
    });
  });
});
