interface IRoutesDefinition {
  [routeName: string]: {
    path: string;
    componentTitle: string;
  } & (
    | {
        componentName: keyof HTMLElementTagNameMap;
        constructorFn?: never;
      }
    | {
        componentName?: never;
        constructorFn: () => HTMLElement;
      }
  );
}

export default IRoutesDefinition;
