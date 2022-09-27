import { removeDomChildren } from "./removeDomChildren";

describe("removeDomChildren should...", () => {
  let ul: HTMLUListElement;

  beforeEach(() => {
    ul = document.createElement("ul");
    [1, 2, 3, 4].forEach((n) => {
      const li = document.createElement("li");
      li.innerHTML = String(n);
      ul.appendChild(li);
    });
  });

  it("should remove successfully", () => {
    expect(ul.children.length).toBe(4);

    removeDomChildren(ul);

    expect(ul.children.length).toBe(0);
  });
});
