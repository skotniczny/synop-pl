import { dateTimeFormatWeekday, dateTimeFormatTime, dateTimeFormatDate } from "../../utils/formats"
import { elt } from "../dom"
import "./dateTime.css"

export function dateTimeComponent(dateISOString: string): HTMLTimeElement {
  const date = new Date(dateISOString)
  const weekdayEl = elt("span", { className: "datetime_weekday display-1" }, dateTimeFormatWeekday.format(date))
  const dateEl = elt("span", { className: "datetime_date" }, dateTimeFormatDate.format(date))
  const timeEl = elt("span", { className: "datetime_time display-2" }, dateTimeFormatTime.format(date))
  return elt("time", { dateTime: dateISOString, className: "datetime text-right" }, weekdayEl, dateEl, timeEl)
}
