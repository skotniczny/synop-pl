import { state } from "../state/appState"
import { elt } from "./dom"
import { setParameter } from "../map/layerSwitcher"
import { type LayerKey } from "../map/layerSwitcher"

export function initControls(selector: string, layersKey: string[][], map: maplibregl.Map) {
  const el = document.querySelector<HTMLDivElement>(selector)
  if (!el) throw Error()
  const buttons = layersKey.map(([key, label]) => {
    const btn = elt("button", { className: "btn", type: "button" }, label)
    btn.dataset.parameter = key
    if (state.selectedLayer === key) btn.classList.add("active")
    return btn
  })
  const checkbox = elt("input", {
    type: "checkbox",
    checked: state.labelsVisible,
  })
  const label = elt("label", {}, checkbox, "Wyświetl nazwy stacji")
  el.append(...buttons, label)
  el.addEventListener("click", (e) => {
    const target = e.target

    if (!(target instanceof HTMLElement)) return

    const btn = target.closest("button[data-parameter]")
    if (btn instanceof HTMLButtonElement) {
      setParameter(map, btn.dataset.parameter as LayerKey)
      buttons.forEach((b) => b.classList.toggle("active", b === btn))
      return
    }

    const input = target.closest("input[type=checkbox]")
    if (input instanceof HTMLInputElement) {
      map.setLayoutProperty("stations-name", "visibility", input.checked ? "visible" : "none")
      state.labelsVisible = input.checked
    }
  })
}
