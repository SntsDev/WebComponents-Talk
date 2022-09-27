import Services from "../../../core/services";

export class UsersElement extends HTMLElement {
  public static observedAttributes = [];

  async connectedCallback() {
    // Create the nodes
    const wrapper = document.createElement("div");
    wrapper.className = "content-wrapper";

    const h1 = document.createElement("h1");
    h1.innerHTML = "Users";
    wrapper.appendChild(h1);

    const loadingWrapper = document.createElement("loading-wrapper-element");
    wrapper.appendChild(loadingWrapper);

    this.appendChild(wrapper);

    // Async part
    loadingWrapper.setLoading(true);
    const usersListNode = await this.showUsers();
    loadingWrapper.appendChild(usersListNode);
    loadingWrapper.setLoading(false);
  }

  private async showUsers(): Promise<HTMLElement> {
    const ul = document.createElement("ul");
    const { statusCode, data: usersList } = await Services.users.getAll();

    if (statusCode === 200) {
      usersList.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `${user.name}, ${user.phone}, ${user.address.city}`;
        ul.appendChild(li);
      });
    }

    await delay(2000);

    return ul;
  }
}

customElements.define("webc-users", UsersElement);

declare global {
  interface HTMLElementTagNameMap {
    "webc-users": UsersElement;
  }
}

function delay(ms = 1000): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, ms);
  });
}
