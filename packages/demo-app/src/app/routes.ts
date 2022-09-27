import IRoutesDefinition from "../core/router/IRoutesDefinition";
import { Router } from "../core/router/Router";
import { removeDomChildren } from "../core/helpers/removeDomChildren";

export const routes: IRoutesDefinition = {
  home: {
    path: "/",
    componentName: "webc-welcome",
    componentTitle: "Welcome!",
  },
  users: {
    path: "/users",
    componentName: "webc-users",
    componentTitle: "Users",
  },
  form: {
    path: "/form",
    componentName: "webc-form",
    componentTitle: "Form",
  },
};

const routerOnChange = (path: string) => {
  const routeDef = Object.keys(routes).find((routeName) => routes[routeName].path === path);

  if (!routeDef) return;

  const mainContentNode = document.getElementById("main-content") as HTMLElement;

  removeDomChildren(mainContentNode);

  if (routes[routeDef].componentName) {
    const ele = document.createElement(routes[routeDef].componentName);
    mainContentNode.appendChild(ele);
  } else if (routes[routeDef].constructorFn) {
    const ele = routes[routeDef].constructorFn();
    mainContentNode.appendChild(ele);
  }
};

export const router = new Router(routes, routerOnChange);

router.start();
