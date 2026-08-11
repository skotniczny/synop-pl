import type { DataRecord } from "../map/config"
import { makeMeteoISOString, makeSynopISOString } from "../utils/date"

const HOUR = 60 * 60 * 1000
const maxAgeHours = 24

function isOutdatedMeteoMeasurement(key: string, record: DataRecord, now: number): boolean {
  // gusts are events, not cyclic readings
  if (key === "wiatr_poryw_10min") return false
  const timestamp = record[`${key}_data`]
  if (!timestamp) return false
  const isFresh = now - Date.parse(makeMeteoISOString(timestamp)) <= maxAgeHours * HOUR
  return !isFresh
}

function isOutdatedSynopRecord(record: DataRecord, now: number): boolean {
  const date = record.data_pomiaru
  const time = record.godzina_pomiaru
  if (!date || !time) return false
  const isFresh = now - Date.parse(makeSynopISOString(date, time)) <= maxAgeHours * HOUR
  return !isFresh
}

export function applyQualityControl(data: DataRecord[], now: number): DataRecord[] {
  return data
    .filter((record) => !isOutdatedSynopRecord(record, now))
    .map((record) => {
      let checked = record
      for (const [key, value] of Object.entries(record)) {
        if (value === null || !(`${key}_data` in record)) continue
        if (!isOutdatedMeteoMeasurement(key, record, now)) continue
        if (checked === record) checked = { ...record }
        checked[key] = null
      }
      return checked
    })
}
