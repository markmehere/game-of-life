import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { App } from "./App";

describe("app", () => {
  it("renders learn", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText(/learn/i)).toBeInTheDocument();
  });
});
