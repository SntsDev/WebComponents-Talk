/**
 * @jest-environment @happy-dom/jest-environment
 */

import { InputUnitsElement } from "./input-units.element";
import { SlInput } from "@shoelace-style/shoelace";
import { removeDomChildren } from "../../../core/helpers/removeDomChildren";

describe("input-units-element should", () => {
  beforeAll(() => {
    // Define it
    window.customElements.define("input-units-element", InputUnitsElement);
  });

  it("renders the internal input", () => {
    const inp = document.createElement("input-units-element");
    inp.setAttribute("units", "METERS");

    removeDomChildren(document.body);
    document.body.appendChild(inp);

    const shadowRoot = inp.shadowRoot;

    if (shadowRoot === null) throw new Error("No shadow root");

    const slInputNode = shadowRoot.querySelector("SL-INPUT");

    expect(slInputNode).toBeDefined();
  });

  it("renders the value in METERS", () => {
    const inp = document.createElement("input-units-element");
    inp.setAttribute("units", "METERS");
    inp.value = 3000;

    removeDomChildren(document.body);
    document.body.appendChild(inp);

    const shadowRoot = inp.shadowRoot;

    if (shadowRoot === null) throw new Error("No shadow root");

    const slInputNode: SlInput = shadowRoot.querySelector("SL-INPUT");

    expect(slInputNode.value).toBe("3");
  });

  it("renders the value in FEET", () => {
    const inp = document.createElement("input-units-element");
    inp.setAttribute("units", "FEET");
    inp.value = 3000;

    removeDomChildren(document.body);
    document.body.appendChild(inp);

    const shadowRoot = inp.shadowRoot;

    if (shadowRoot === null) throw new Error("No shadow root");

    const slInputNode: SlInput = shadowRoot.querySelector("SL-INPUT");

    expect(slInputNode.value).toBe("9.84252");
  });
});
