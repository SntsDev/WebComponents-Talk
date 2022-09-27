export function removeDomChildren(
  d: HTMLElement | SVGElement | ShadowRoot
): HTMLElement | SVGElement | ShadowRoot {
  while (d.firstChild) d.removeChild(d.firstChild);
  return d;
}
