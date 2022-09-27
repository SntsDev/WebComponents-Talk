import { SlSpinner } from "@shoelace-style/shoelace";

export default class LoadingWrapper extends HTMLElement {
  private intSlot: HTMLSlotElement;
  private intSpinner: SlSpinner;
  private isShowingSpinner = false;

  constructor() {
    super();
    this.intSlot = document.createElement("slot");
    this.intSpinner = document.createElement("sl-spinner");
    this.intSpinner.style.fontSize = "2rem";

    this.intSpinner.style.display = "none";
    this.intSlot.style.display = "block";
  }

  connectedCallback() {
    const root = this.attachShadow({ mode: "open" });

    root.appendChild(this.intSlot);
    root.appendChild(this.intSpinner);
  }

  setLoading(showSpinner = false, force = false) {
    if (this.isShowingSpinner === showSpinner && !force) return;
    this.isShowingSpinner = showSpinner;
    this.intSpinner.style.display = showSpinner ? "block" : "none";
    this.intSlot.style.display = showSpinner ? "none" : "block";
  }
}

customElements.define("loading-wrapper-element", LoadingWrapper);

declare global {
  interface HTMLElementTagNameMap {
    "loading-wrapper-element": LoadingWrapper;
  }
}
