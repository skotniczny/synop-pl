import { elt } from "../dom"

export function initRadioList(
  items: { key: string; label: string; checked: boolean }[],
  changeEvent: (e: Event) => void,
): HTMLDivElement {
  const elts: DocumentFragment = document.createDocumentFragment()
  const id = Math.random().toString(36).slice(2, 8)
  for (const item of items) {
    const radioId = `${item.key}-${id}`
    const radio: HTMLInputElement = elt("input", {
      className: "form-check",
      type: "radio",
      name: `radio-${id}`,
      id: radioId,
      value: item.key,
      checked: item.checked,
    })
    const label: HTMLLabelElement = elt("label", { className: "form-label", htmlFor: radioId }, item.label)
    elts.append(radio, label)
  }
  const container: HTMLDivElement = elt("div", { className: "form-group" }, elts)
  container.addEventListener("change", changeEvent)
  return container
}
