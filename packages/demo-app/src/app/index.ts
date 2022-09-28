import "@shoelace-style/shoelace/dist/components/button/button";
import "@shoelace-style/shoelace/dist/components/dialog/dialog";
import "@shoelace-style/shoelace/dist/components/input/input";
import "@shoelace-style/shoelace/dist/components/radio/radio";
import "@shoelace-style/shoelace/dist/components/radio-button/radio-button";
import "@shoelace-style/shoelace/dist/components/radio-group/radio-group";
import "@shoelace-style/shoelace/dist/components/spinner/spinner";
import "@shoelace-style/shoelace/dist/themes/light.css";

import { Router } from "../core/router/Router";
import { removeDomChildren } from "../core/helpers/removeDomChildren";
import { routes } from "./routes";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";

/** Initialize the App */

setBasePath("assets/shoelace");

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
