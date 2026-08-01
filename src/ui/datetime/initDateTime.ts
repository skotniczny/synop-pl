import { makeDateISOString } from "../../utils/date"
import { dateTimeComponent } from "./dateTime"
import { mostFrequent } from "../../utils/mostFrequent"
import type { DataRecord } from "../../map/config"

let timeEl: HTMLTimeElement

function makeMeasureDateISOString(data: DataRecord[]): string {
  let dateISOString = new Date().toISOString()
  const measureDateISOString = data
    .filter((item) => item.data_pomiaru && item.godzina_pomiaru)
    .map((item) => makeDateISOString(item.data_pomiaru!, item.godzina_pomiaru!))
  if (measureDateISOString.length) {
    dateISOString = mostFrequent<string>(measureDateISOString)
  }
  return dateISOString
}

export function initDateTime(el: HTMLElement, data: DataRecord[]) {
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
