import { createContentWrapper } from "./createContentWrapper";

describe("createContentWrapper should...", () => {
  let webc: HTMLElement;

  beforeEach(() => {
    webc = createContentWrapper();
  });

  it("should create successfully", () => {
    expect(webc).toBeTruthy();
  });

  it("should have a classname", () => {
    expect(webc.className).toBe("content-wrapper");
  });
});
