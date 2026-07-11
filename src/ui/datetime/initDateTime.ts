import type { SynopRecord } from "../../api/fetch"
import { makeDateISOString } from "../../utils/date"
import { dateTimeComponent } from "./dateTime"
import { mostFrequent } from "../../utils/mostFrequent"

export function initDateTime(el: HTMLElement, data: SynopRecord[]) {
  const measureDateISOString = data.map((item) => makeDateISOString(item.data_pomiaru, item.godzina_pomiaru))
  const dateISOString = mostFrequent<string>(measureDateISOString)
  el.append(dateTimeComponent(dateISOString))
}
