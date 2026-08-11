import { makeSynopISOString } from "../../utils/date"
import { dateTimeComponent } from "./dateTime"
import { mostFrequent } from "../../utils/mostFrequent"
import type { DataRecord } from "../../map/config"

let timeEl: HTMLTimeElement

function makeMeasureDateISOString(data: DataRecord[]): string {
  let dateISOString = new Date().toISOString()
  const measureDateISOString = data
    .filter((item) => item.data_pomiaru && item.godzina_pomiaru)
    .map((item) => makeSynopISOString(item.data_pomiaru!, item.godzina_pomiaru!))
  if (measureDateISOString.length) {
    dateISOString = mostFrequent<string>(measureDateISOString)
  }
  return dateISOString
}

export function initDateTime(selector: string, data: DataRecord[]) {
  const el = document.querySelector<HTMLDivElement>(selector)
  if (!el) throw new Error(`Element not found for selector: ${selector}`)
  const dateISOString = makeMeasureDateISOString(data)
  timeEl = dateTimeComponent(dateISOString)
  el.append(timeEl)
}

export function updateDateTime(data: DataRecord[]) {
  const dateISOString = makeMeasureDateISOString(data)
  const newEl = dateTimeComponent(dateISOString)
  timeEl.replaceWith(newEl)
  timeEl = newEl
}
