import { elt } from "../dom"
import { config } from "../../state/appState"
import type { DataRecord } from "../../map/config"
import type { ExtremesResult } from "./extremes"
import { computeExtremes } from "./extremes"
import "./highlightWidget.css"

let extremes: ExtremesResult
let rootEl: HTMLDivElement

function createHighlightList(data: DataRecord[]): HTMLUListElement {
  const nameKey = config.stationNameKey
  const ul = elt("ul", { className: "highlight_list" })
  for (const item of data) {
    ul.append(elt("li", {}, `${item[nameKey]}`))
  }
  return ul
}

function createHighlightContainer(data: DataRecord[], key: string, unit: string): HTMLDivElement {
  const container = elt("div", { className: "highlight_container" })
  const raw = Number(data[0][key])
  const value = `${raw}${unit}`
  const feat = elt("span", { className: "display-2 highlight_item" }, value)
  const ul = createHighlightList(data)
  container.append(feat, ul)
  return container
}

export function initHighlightWidget(selector: string, data: DataRecord[]) {
  const el = document.querySelector<HTMLDivElement>(selector)
  if (!el) throw new Error(`Element not found for selector: ${selector}`)
  rootEl = el
  extremes = computeExtremes(data)
}

export function setHighlightedProperty(measurementKey: string, unit: string, showMin: boolean) {
  const maxEl = createHighlightContainer(extremes[measurementKey].max, measurementKey, unit)
  maxEl.classList.add("highlight_container-max")
  const nodes: HTMLDivElement[] = [maxEl]
  if (showMin) {
    const minEl = createHighlightContainer(extremes[measurementKey].min, measurementKey, unit)
    minEl.classList.add("highlight_container-min")
    nodes.push(minEl)
  }
  rootEl.replaceChildren(...nodes)
}
