import { History, Location, createBrowserHistory } from "history";

import IRoutesDefinition from "./IRoutesDefinition";

/**
 * This is a very simple Router just to show a SPA
 */
export class Router {
  private routes: IRoutesDefinition;

  private onChange: (path: string) => void;

  private currentHref: string | undefined = undefined;

  private history: History;

  constructor(routes: IRoutesDefinition, onChange: (path: string) => void, history?: History) {
    this.routes = routes;
    this.onChange = onChange;
    this.history = history || createBrowserHistory();
  }

  start(omitInitialCall = false) {
    const historyChanged = ({ location }: { location: Location }) => {
      const path = sanitizePath(location.pathname);

      if (this.currentHref === path) return;

      if (this.onChange) this.onChange(path);

      this.currentHref = path;
    };

    this.history.listen(historyChanged);

    // Initial call
    if (!omitInitialCall) {
      historyChanged({ location: this.history.location });
    }

    return this;
  }

  navigate = (path: string, state?: unknown, replaceCurrentHref = true): Promise<void> => {
    return new Promise((resolve) => {
      const pathBase = path ? (path === "" ? "/" : path) : "/";
      this.history.push(pathBase, state);
      if (replaceCurrentHref) this.currentHref = pathBase;
      resolve();
    });
  };
}

function sanitizePath(name: string): string {
  return "/" + name.split("/").filter(Boolean).join("/");
}
