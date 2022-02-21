import { render, screen as s } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { App } from "./App";

describe("app", () => {
  it("renders successfully", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(s.getByText("Next generation")).toBeInTheDocument();
  });
});
