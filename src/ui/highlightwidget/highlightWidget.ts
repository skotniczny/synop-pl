import { elt } from "../dom"
import type { SynopRecord } from "../../api/fetch"
import type { ExtremesResult } from "./extremes"
import type { SynopKey } from "../../map/config"
import { computeExtremes } from "./extremes"
import "./highlightWidget.css"

let extremes: ExtremesResult
let rootEl: HTMLDivElement

function createHighlightList(data: SynopRecord[]): HTMLUListElement {
  const ul = elt("ul", { className: "highlight_list" })
  for (const item of data) {
    ul.append(elt("li", {}, `${item.stacja}`))
  }
  return ul
}

function createHighlightContainer(data: SynopRecord[], key: SynopKey, unit: string): HTMLDivElement {
  const container = elt("div", { className: "highlight_container" })
  const raw = Number(data[0][key])
  const value = `${raw}${unit}`
  const feat = elt("span", { className: "display-2 highlight_item" }, value)
  const ul = createHighlightList(data)
  container.append(feat, ul)
  return container
}

export function initHighlightWidget(selector: string, data: SynopRecord[]) {
  const el = document.querySelector<HTMLDivElement>(selector)
  if (!el) throw new Error(`Element not found for selector: ${selector}`)
  rootEl = el
  extremes = computeExtremes(data)
}

export function setHighlightedProperty(synopKey: SynopKey, unit: string) {
  const maxEl = createHighlightContainer(extremes[synopKey].max, synopKey, unit)
  maxEl.classList.add("highlight_container-max")
  const nodes = [maxEl]
  if (synopKey !== "suma_opadu" && synopKey !== "predkosc_wiatru") {
    const minEl = createHighlightContainer(extremes[synopKey].min, synopKey, unit)
    minEl.classList.add("highlight_container-min")
    nodes.push(minEl)
  }
  rootEl.replaceChildren(...nodes)
}
