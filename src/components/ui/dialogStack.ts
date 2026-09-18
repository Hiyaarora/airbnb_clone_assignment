/**
 * Tracks open dialogs in stacking order so that:
 * - Escape is handled by the top-most dialog only (lightbox closes before the tour);
 * - everything outside the top-most dialog is `inert` (no focus, no clicks, hidden from AT).
 * Overlays are siblings of <main> under <body>, so inert is applied to body's element
 * children except the active dialog's own top-level node.
 */
const stack: HTMLElement[] = [];

function topLevelNode(el: HTMLElement): HTMLElement {
  let node: HTMLElement = el;
  while (node.parentElement && node.parentElement !== document.body) node = node.parentElement;
  return node;
}

function applyInert() {
  const top = stack[stack.length - 1];
  const keep = top ? topLevelNode(top) : null;
  for (const child of Array.from(document.body.children)) {
    if (!(child instanceof HTMLElement)) continue;
    if (child.tagName === "SCRIPT" || child.tagName === "LINK" || child.tagName === "STYLE") continue;
    if (child === keep) child.removeAttribute("inert");
    else if (top) child.setAttribute("inert", "");
    else child.removeAttribute("inert");
  }
}

export function pushDialog(el: HTMLElement) {
  stack.push(el);
  applyInert();
}

export function popDialog(el: HTMLElement) {
  const i = stack.lastIndexOf(el);
  if (i >= 0) stack.splice(i, 1);
  applyInert();
}

export function isTopDialog(el: HTMLElement) {
  return stack[stack.length - 1] === el;
}
