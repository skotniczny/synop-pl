export function elt<K extends keyof HTMLElementTagNameMap>(
  type: K,
  props?: Partial<HTMLElementTagNameMap[K]>,
  ...children: Array<string | Node>
): HTMLElementTagNameMap[K] {
  const dom = document.createElement(type)

  if (props) Object.assign(dom, props)

  for (const child of children) {
    dom.append(child)
  }

  return dom
}
