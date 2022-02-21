import { screen as s, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "redux/store";
import * as hooks from "redux/hooks";
import { Header } from "./Header";

describe("<Header />", () => {
  it("matches snapshot", async () => {
    const wrapper = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const nextButton = await s.findByRole("button", {
      name: "Next generation",
    });
    expect(nextButton).toBeInTheDocument();
    const resetButton = await s.findByRole("button", {
      name: "Reset",
    });
    expect(resetButton).toBeInTheDocument();
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("reset button dispatches on click", async () => {
    const spy = jest.spyOn(hooks, "useAppDispatch");
    const mockDispatch = jest.fn();
    spy.mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const resetButton = await s.findByRole("button", {
      name: "Reset",
    });
    userEvent.click(resetButton);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("next button dispatches on click", async () => {
    const spy = jest.spyOn(hooks, "useAppDispatch");
    const mockDispatch = jest.fn();
    spy.mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const nextButton = await s.findByRole("button", {
      name: "Next generation",
    });
    userEvent.click(nextButton);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
