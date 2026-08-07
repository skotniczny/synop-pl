import { dateTimeFormatWeekday, dateTimeFormatTime, dateTimeFormatDate } from "../../utils/formats"
import { elt } from "../dom"

export function dateTimeComponent(dateISOString: string): HTMLTimeElement {
  const date = new Date(dateISOString)
  const weekdayEl = elt("span", { className: "text-capitalize d-block display-1" }, dateTimeFormatWeekday.format(date))
  const dateEl = elt("span", { className: "datetime" }, dateTimeFormatDate.format(date))
  const timeEl = elt("span", { className: "time d-block display-2" }, dateTimeFormatTime.format(date))
  return elt("time", { dateTime: dateISOString, className: "text-right" }, weekdayEl, dateEl, timeEl)
}
