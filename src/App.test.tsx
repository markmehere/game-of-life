import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { App } from "./App";

describe("app", () => {
  it("renders successfully", () => {
    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(wrapper.getByText("Next generation")).toBeInTheDocument();
  });
});
