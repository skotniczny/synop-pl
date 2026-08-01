import { makeDateISOString } from "../../utils/date"
import { dateTimeComponent } from "./dateTime"
import { mostFrequent } from "../../utils/mostFrequent"
import type { DataRecord } from "../../map/config"

export function initDateTime(el: HTMLElement, data: DataRecord[]) {
  const measureDateISOString = data
    .filter((item) => item.data_pomiaru && item.godzina_pomiaru)
    .map((item) => makeDateISOString(item.data_pomiaru!, item.godzina_pomiaru!))
  if (!measureDateISOString.length) return
  const dateISOString = mostFrequent<string>(measureDateISOString)
  el.append(dateTimeComponent(dateISOString))
}
