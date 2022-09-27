import { IConverter, UnitsEnum, unitsConverters } from "./converter";

import { SlInput } from "@shoelace-style/shoelace";

export class InputUnitsElement extends HTMLElement {
  public static observedAttributes = ["units"];

  private internalValue? = 0;
  private internalUnits = UnitsEnum.METERS;
  private input: SlInput;
  private converter: IConverter | undefined = undefined;

  constructor() {
    super();
    this.input = document.createElement("sl-input");
    this.input.type = "number";
    this.input.setAttribute("exportparts", "form-control-label, form-control-help-text, base");
  }

  get value(): number | undefined {
    return this.internalValue;
  }

  set value(v: number | undefined) {
    this.internalValue = v;
    this.setDisplayValue(v);
  }

  get units() {
    return this.internalUnits === UnitsEnum.METERS ? "METERS" : "FEET";
  }

  get label() {
    return this.input.label;
  }

  set label(v: string) {
    this.input.label = v;
  }

  get helpText() {
    return this.input.helpText;
  }

  set helpText(v: string) {
    this.input.helpText = v;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const inp = this.input;

    if (this.label) inp.label = this.label;

    shadow.appendChild(inp);

    this.setDisplayValue(this.internalValue);

    inp.addEventListener("sl-change", this.onChange, false);
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case "units":
        if (newValue.toUpperCase() === "FEET") {
          this.converter = unitsConverters[UnitsEnum.FEET];
          this.internalUnits = UnitsEnum.FEET;
          this.setDisplayValue(this.internalValue);
        } else {
          this.converter = unitsConverters[UnitsEnum.METERS];
          this.internalUnits = UnitsEnum.METERS;
          this.setDisplayValue(this.internalValue);
        }
        break;
    }
  }

  private setDisplayValue(v: number | undefined) {
    if (v === undefined || isNaN(v)) {
      this.input.value = "";
      return;
    }

    const intValue = this.converter ? this.converter.fromDataToDisplay(v) : v;

    this.input.value = String(intValue);
  }

  private onChange = (e: Event) => {
    const t = e.target as SlInput;
    if (t.value === "") {
      this.internalValue = undefined;
      return;
    }

    const faceValue = Number(t.value);
    if (isNaN(faceValue)) return;

    this.internalValue = this.converter ? this.converter.fromDisplayToData(faceValue) : faceValue;
  };

  focus() {
    this.input.focus();
  }
}

customElements.define("input-units-element", InputUnitsElement);

declare global {
  interface HTMLElementTagNameMap {
    "input-units-element": InputUnitsElement;
  }
}
