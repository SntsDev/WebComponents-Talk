import { addStyles } from "../../../core/helpers/addStyles";
import { router } from "../../../app";
import { routes } from "../../../app/routes";
import { styles } from "./menu.element.module";

export class MenuElement extends HTMLElement {
  public static observedAttributes = [];

  private routesToShow = routes;
  private isMounted = false;
  private shouldRender = true;

  connectedCallback() {
    this.isMounted = true;
    const shadowRoot = this.attachShadow({ mode: "closed" });

    if (this.shouldRender) this.initialize(shadowRoot);
  }

  disconnectedCallback() {
    this.isMounted = false;
  }

  private initialize(shadowRoot: ShadowRoot) {
    if (!this.isMounted) return;

    this.shouldRender = false;

    const ul = document.createElement("ul");
    Object.keys(this.routesToShow).forEach((routeName) => {
      const attrs = this.routesToShow[routeName];
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.setAttribute("href", attrs.path);
      a.innerHTML = attrs.componentTitle;
      a.onclick = this.onClick;

      li.appendChild(a);
      ul.appendChild(li);
    });

    // Styles from the outside won't pass.
    // Solution 1, append its own stylesheet
    shadowRoot.appendChild(addStyles(styles));

    shadowRoot.appendChild(ul);
  }

  private onClick(e: MouseEvent) {
    e.preventDefault();
    const target = e.target as HTMLAnchorElement;
    router.navigate(target.href);
    return false;
  }
}

customElements.define("webc-menu", MenuElement);

declare global {
  interface HTMLElementTagNameMap {
    "webc-menu": MenuElement;
  }
}
