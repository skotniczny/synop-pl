import type { DataRecord } from "../map/config"
import { meteoMeasurementTime, synopMeasurementTime } from "./measurementTime"

const HOUR = 60 * 60 * 1000
const maxAgeHours = 24

function isOutdated(time: string | null, now: number): boolean {
  if (!time) return false
  const age = now - Date.parse(time)
  if (Number.isNaN(age)) return true
  return age > maxAgeHours * HOUR
}

function isOutdatedMeteoMeasurement(key: string, record: DataRecord, now: number): boolean {
  // gusts are events
  if (key === "wiatr_poryw_10min") return false
  return isOutdated(meteoMeasurementTime(record, key), now)
}

function isOutdatedSynopRecord(record: DataRecord, now: number): boolean {
  return isOutdated(synopMeasurementTime(record), now)
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
