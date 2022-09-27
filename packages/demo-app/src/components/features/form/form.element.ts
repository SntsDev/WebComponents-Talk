import "./form.element.scss";

import { FormValidator, IFormModel } from "./IFormModel";

import { z } from "zod";

const unitsOptions = [
  { label: "Meters", value: "METERS" },
  { label: "Feet", value: "FEET" },
];

const initialUnits = unitsOptions[0].value;

export class FormElement extends HTMLElement {
  public static observedAttributes = [];

  private internalState: IFormModel = { title: "", space: 0 };

  connectedCallback() {
    // Create the nodes
    const wrapper = document.createElement("div");
    wrapper.className = "content-wrapper";

    const h1 = document.createElement("h1");
    h1.innerHTML = "Form";
    wrapper.appendChild(h1);

    const form = document.createElement("form");
    form.noValidate = true;

    // Radio Buttons for Units
    const rbg = document.createElement("sl-radio-group");
    rbg.label = "Units:";
    rbg.fieldset = true;

    unitsOptions.forEach(({ label, value }) => {
      const rb = document.createElement("sl-radio");
      rb.innerHTML = label;
      rb.value = value;
      rbg.appendChild(rb);
    });

    rbg.value = initialUnits;

    form.appendChild(warpInRow(rbg));

    // Input with units for Space
    const inp = document.createElement("input-units-element");
    inp.label = "Space:";
    inp.helpText = "Minimum 6 meters";
    inp.setAttribute("units", initialUnits);
    inp.value = this.internalState.space;
    form.appendChild(warpInRow(inp, "space"));

    // Input for Title
    const text = document.createElement("sl-input");
    text.label = "Title:";
    text.value = this.internalState.title;
    form.appendChild(warpInRow(text, "title"));

    const submitBtn = document.createElement("sl-button");
    submitBtn.innerHTML = "Submit";
    submitBtn.variant = "primary";
    submitBtn.type = "submit";
    form.appendChild(submitBtn);

    // Logger
    const pre = document.createElement("pre");
    pre.appendChild(document.createTextNode(`Value of Space:\n`));
    form.appendChild(pre);

    wrapper.appendChild(form);
    this.appendChild(wrapper);

    // Add listeners here (to simplify)
    rbg.addEventListener("sl-change", () => {
      inp.setAttribute("units", rbg.value);
    });

    inp.addEventListener("sl-change", () => {
      pre.appendChild(document.createTextNode(`${inp.value}\n`));
      this.internalState.space = inp.value;
    });

    text.addEventListener("sl-change", () => {
      this.internalState.title = text.value;
    });

    form.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const validation = FormValidator.safeParse(this.internalState);

      if (validation.success) {
        const modal = document.createElement("sl-dialog");
        modal.label = "Result";
        modal.appendChild(document.createTextNode("Perfect!"));
        this.appendChild(modal);
        modal.show();
      } else {
        markFieldsWithErrors(validation);
      }
      return false;

      function markFieldsWithErrors(
        valRes: z.SafeParseSuccess<IFormModel> | z.SafeParseError<IFormModel>
      ) {
        const validationResultError = valRes as z.SafeParseError<IFormModel>;
        const issues = validationResultError.error ? validationResultError.error.issues : [];
        issues.forEach(({ path }) => {
          const fieldName = path[0];
          const row = document.getElementById(`form-row-${fieldName}`);
          if (row) row.classList.add("has-error");
        });
      }
    });
  }
}

customElements.define("webc-form", FormElement);

declare global {
  interface HTMLElementTagNameMap {
    "webc-form": FormElement;
  }
}

function warpInRow(e: Element, id?: string): HTMLDivElement {
  const row = document.createElement("div");
  row.className = "form-row";
  row.appendChild(e);
  if (id) row.setAttribute("id", `form-row-${id}`);
  return row;
}
