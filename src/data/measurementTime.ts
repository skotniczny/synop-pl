import type { DataRecord } from "../map/config"

function makeSynopISOString(date: string, time: string): string {
  return `${date}T${time.padStart(2, "0")}:00:00.000Z`
}

function makeMeteoISOString(timestamp: string): string {
  return `${timestamp.replace(" ", "T")}.000Z`
}

export function synopMeasurementTime(record: DataRecord): string | null {
  const date = record.data_pomiaru
  const time = record.godzina_pomiaru
  if (!date || !time) return null
  return makeSynopISOString(date, time)
}

export function meteoMeasurementTime(record: DataRecord, measurementKey: string): string | null {
  const timestamp = record[`${measurementKey}_data`]
  if (!timestamp) return null
  return makeMeteoISOString(timestamp)
}
