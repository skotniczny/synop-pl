import { state, config } from "../../state/appState"
import { elt } from "../dom"
import { renderData, setLayer } from "../../map/layerSwitcher"
import { createSearch } from "../search/search"
import { createCheckbox } from "../checkbox/checkbox"

let el: HTMLDivElement | null = null
let control: HTMLDivElement
let buttons: HTMLButtonElement[] = []

const showLabels = "show-labels"
const filterData = "filter-data"
const labelsCheckbox = createCheckbox(showLabels, "Wyświetl nazwy stacji", state.labelsVisible)
const filterCheckbox = createCheckbox(filterData, "Ukryj przestarzałe pomiary", state.qualityControl)
const checks = [labelsCheckbox, filterCheckbox]

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
  control.replaceChildren(...buttons, ...checks)
}

export function initControls(selector: string, map: maplibregl.Map) {
  el = document.querySelector<HTMLDivElement>(selector)
  if (!el) throw new Error(`Element not found for selector: ${selector}`)
  updateButtons()

  const search = createSearch(map)

  control = elt("div", { className: "form-group control" }, ...buttons, ...checks)
  control.addEventListener("click", (e) => {
    const target = e.target

    if (!(target instanceof HTMLElement)) return

    const btn = target.closest("button[data-parameter]")
    if (btn instanceof HTMLButtonElement && btn.dataset.parameter) {
      setLayer(map, btn.dataset.parameter)
      buttons.forEach((b) => b.classList.toggle("active", b.dataset.parameter === state.selectedLayer))
    }
  })
  control.addEventListener("change", (e) => {
    const input = e.target
    if (!(input instanceof HTMLInputElement)) return

    switch (input.name) {
      case showLabels:
        map.setLayoutProperty("stations-name", "visibility", input.checked ? "visible" : "none")
        state.labelsVisible = input.checked
        return
      case filterData:
        state.qualityControl = input.checked
        renderData(map)
        return
    }
  })
  el.append(search, control)
}
