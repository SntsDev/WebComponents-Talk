import { addStyles } from "./addStyles";

const styles = `
  span { color: red }
`;

describe("addStyles should...", () => {
  it("should create successfully", () => {
    expect(addStyles(styles)).toBeTruthy();
  });

  it("should have a classname", () => {
    const stylesTag = addStyles(styles);

    expect(stylesTag.nodeName).toBe("STYLE");
    expect(stylesTag.innerText).toMatch(/span \{ color: red \}/gim);
  });
});
