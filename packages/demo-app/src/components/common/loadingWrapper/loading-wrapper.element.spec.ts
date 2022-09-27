/**
 * @jest-environment @happy-dom/jest-environment
 */

import LoadingWrapper from "./loading-wrapper.element";
import { removeDomChildren } from "../../../core/helpers/removeDomChildren";

const nodeTag = "loading-wrapper-element";

const createElementInstance = (isLoading = false): LoadingWrapper => {
  const loadingWrapper = document.createElement(nodeTag);
  if (isLoading) loadingWrapper.setLoading(true);

  const child1 = document.createElement("h1"),
    child2 = document.createElement("p");

  child1.innerHTML = "This is the title";
  child2.innerHTML = "This is the content";

  loadingWrapper.appendChild(child1);
  loadingWrapper.appendChild(child2);

  removeDomChildren(document.body);
  document.body.appendChild(loadingWrapper);

  return loadingWrapper;
};

describe("Webcomponent div-spinner-element should", () => {
  beforeAll(() => {
    // Define it
    window.customElements.define(nodeTag, LoadingWrapper);
  });

  it("render children", async () => {
    const node = createElementInstance();
    const shadowRoot = node.shadowRoot;

    if (shadowRoot === null) throw new Error("No shadow root");

    const title = getByText(node, /the title/i);
    expect(title).toBeDefined();
    expect(title?.nodeName).toBe("H1");
    expect(title?.innerHTML).toBe("This is the title");

    const content = getByText(node, /the content/i);
    expect(content).toBeDefined();
    expect(content?.nodeName).toBe("P");
    expect(content?.innerHTML).toBe("This is the content");
  });

  it("render the spinner and not the content", async () => {
    createElementInstance(true);

    const node = createElementInstance(true);
    const shadowRoot = node.shadowRoot;

    if (shadowRoot === null) throw new Error("No shadow root");

    const shadowNodes = Array.from(shadowRoot.querySelectorAll("*"));

    const slotNode = shadowNodes.find((n) => n.nodeName === "SLOT");
    expect(slotNode).toBeDefined();
    expect(slotNode).toHaveStyle({
      display: "none",
    });

    const loadingNode = shadowNodes.find((n) => n.nodeName === "SL-SPINNER");
    expect(loadingNode).toBeDefined();
    expect(loadingNode).toHaveStyle({
      display: "block",
    });
  });

  it("render the content and not the spinner", async () => {
    const node = createElementInstance();
    const shadowRoot = node.shadowRoot;

    if (shadowRoot === null) throw new Error("No shadow root");

    const shadowNodes = Array.from(shadowRoot.querySelectorAll("*"));

    const slotNode = shadowNodes.find((n) => n.nodeName === "SLOT");
    expect(slotNode).toBeDefined();
    expect(slotNode).toHaveStyle({
      display: "block",
    });

    const loadingNode = shadowNodes.find((n) => n.nodeName === "SL-SPINNER");
    expect(loadingNode).toBeDefined();
    expect(loadingNode).toHaveStyle({
      display: "none",
    });
  });
});

function getByText(node: Element | ShadowRoot, s: string | RegExp): Element | undefined {
  const allNodes = Array.from(node.querySelectorAll("*"));

  const candidate = allNodes.find((node) =>
    typeof s === "string" ? node.innerHTML.includes(s) : node.innerHTML.match(s)
  );

  return candidate;
}
