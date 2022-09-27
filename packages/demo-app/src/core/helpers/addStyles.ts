export function addStyles(styles: string): HTMLStyleElement {
  const stylesNode = document.createElement("style");
  stylesNode.innerText = styles.replace(/\n/g, "");
  return stylesNode;
}
