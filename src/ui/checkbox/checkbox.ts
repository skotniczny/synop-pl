import { elt } from "../dom"

export function createCheckbox(name: string, labelText: string, checked?: boolean): HTMLDivElement {
  const id = `${name}-${Math.random().toString(36).slice(2, 8)}`
  const input = elt("input", { type: "checkbox", className: "form-check_input", id, name, checked })
  const label = elt("label", { htmlFor: id, className: "form-check_label" }, labelText)
  return elt("div", { className: "form-check" }, input, label)
}
