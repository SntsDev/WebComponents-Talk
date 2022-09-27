import { getByText, screen } from "@testing-library/dom";

import { WelcomeElement } from "./welcome.element";
import { removeDomChildren } from "../../../core/helpers/removeDomChildren";

const title = "Welcome to Web Components Demo App!";

describe("WelcomeElement (has no shadow-root)", () => {
  it("should create successfully", () => {
    const webcNode = new WelcomeElement();
    expect(webcNode).toBeTruthy();
  });

  it("should have a greeting (1)", () => {
    const webcNode = new WelcomeElement();
    // Simulate it has been added to the DOM
    webcNode.connectedCallback();

    // Node check
    expect(webcNode.querySelector("h1").innerHTML).toContain(title);

    // Using @testing-library/dom as 'usual' won't work!!!
    // expect(screen.getByText(title)).toBeTruthy();

    // Use @testing-library/dom from the created node
    expect(getByText(webcNode, title)).toBeTruthy();
  });

  it("should have a greeting (2)", () => {
    // Add it to the document body (you should always remove previous nodes first)
    removeDomChildren(document.body);

    const webcNode = document.createElement("webc-welcome");
    document.body.appendChild(webcNode);

    // Node check
    expect(webcNode.querySelector("h1").innerHTML).toContain(title);

    // Using @testing-library/dom: Will work
    expect(screen.getByText(title)).toBeTruthy();
  });
});
