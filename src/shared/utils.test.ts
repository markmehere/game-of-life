import { clone } from "./utils";

describe("utils", () => {
  it("clones successfully", () => {
    const x = { a: "10", b: "12" };
    const y = clone(x);

    expect(x).toEqual(y);
    expect(x).not.toBe(y);
  });
});
