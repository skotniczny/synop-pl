import { state, config } from "../../state/appState"
import { elt } from "../dom"
import { setParameter } from "../../map/layerSwitcher"
import { createSearch } from "../search/search"

let el: HTMLDivElement | null = null
let control: HTMLDivElement
let buttons: HTMLButtonElement[] = []
const checkbox = elt("input", {
  type: "checkbox",
  checked: state.labelsVisible,
})
const label = elt("label", {}, checkbox, "Wyświetl nazwy stacji")

function updateButtons(): void {
  const layers = config.layers
  buttons = Object.entries(layers).map(([key, { label, unit }]) => {
    const btnLabel = `${label} [${unit.trim()}]`
    const btn = elt("button", { className: "btn", type: "button" }, btnLabel)
    btn.dataset.parameter = key
    if (state.selectedLayer === key) btn.classList.add("active")
    return btn
  })
}

export function updateControls() {
  if (!el) return
  updateButtons()
  control.replaceChildren(...buttons, label)
}

export function initControls(selector: string, map: maplibregl.Map) {
  el = document.querySelector<HTMLDivElement>(selector)
  if (!el) throw new Error(`Element not found for selector: ${selector}`)
  updateButtons()

  const search = createSearch(map)
  control = elt("div", { className: "form-group control" }, ...buttons, label)
  control.addEventListener("click", (e) => {
    const target = e.target

    if (!(target instanceof HTMLElement)) return

    const btn = target.closest("button[data-parameter]")
    if (btn instanceof HTMLButtonElement && btn.dataset.parameter) {
      setParameter(map, btn.dataset.parameter)
      buttons.forEach((b) => b.classList.toggle("active", b.dataset.parameter === state.selectedLayer))
      return
    }

    const input = target.closest("input[type=checkbox]")
    if (input instanceof HTMLInputElement) {
      map.setLayoutProperty("stations-name", "visibility", input.checked ? "visible" : "none")
      state.labelsVisible = input.checked
    }
  })
  el.append(search, control)
}
