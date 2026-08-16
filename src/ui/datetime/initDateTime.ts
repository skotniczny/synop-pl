import { dateTimeComponent } from "./dateTime"
import { config } from "../../state/appState"
import { mostFrequent } from "../../utils/mostFrequent"
import type { DataRecord, LayerConfig } from "../../map/config"

let rootEl: HTMLDivElement
let measureTimes: Record<string, string> = {}

// dominant measurement time per parameter — stations report at their own pace,
// so the most frequent timestamp describes the data better than any single one
function makeMeasureTimes(data: DataRecord[]): Record<string, string> {
  const keys = Object.values(config.layers).map((layer) => layer.measurementKey)

  const result: Record<string, string> = {}
  for (const key of keys) {
    const times = data.flatMap((item) => {
      if (item[key] === null) return []
      return config.measurementTime(item, key) ?? []
    })
    if (times.length) result[key] = mostFrequent<string>(times)
  }
  return result
}

export function initDateTime(selector: string) {
  const el = document.querySelector<HTMLDivElement>(selector)
  if (!el) throw new Error(`Element not found for selector: ${selector}`)
  rootEl = el
}

export function updateDateTime(layerCfg: LayerConfig, data?: DataRecord[]) {
  if (data) measureTimes = makeMeasureTimes(data)
  const dateISOString = measureTimes[layerCfg.measurementKey]
  if (!dateISOString) {
    rootEl.replaceChildren()
    return
  }
  rootEl.replaceChildren(dateTimeComponent(dateISOString))
}
