import IRoutesDefinition from "../core/router/IRoutesDefinition";

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
