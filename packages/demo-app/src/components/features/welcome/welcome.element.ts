import "./welcome.element.scss";

export class WelcomeElement extends HTMLElement {
  public static observedAttributes = ["isblueish"];

  private internalIsBlueish = false;

  connectedCallback() {
    // Create the nodes
    const wrapper = document.createElement("div");
    wrapper.className = "content-wrapper";

    const h1 = document.createElement("h1");
    h1.innerHTML = "Welcome to Web Components Demo App!";
    wrapper.appendChild(h1);

    const img = document.createElement("img");
    img.src = "assets/hmm-whatever.gif";
    wrapper.appendChild(img);

    this.appendChild(wrapper);
  }

  disconnectedCallback() {
    // Clean-up ...
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case "isblueish":
        this.isBlueish = newValue === "true";
        break;
    }
  }

  get isBlueish() {
    return this.internalIsBlueish;
  }

  set isBlueish(v: boolean) {
    this.internalIsBlueish = v;
    if (v) this.classList.add("blueish");
    else this.classList.remove("blueish");
  }
}

customElements.define("webc-welcome", WelcomeElement);

declare global {
  interface HTMLElementTagNameMap {
    "webc-welcome": WelcomeElement;
  }
}
