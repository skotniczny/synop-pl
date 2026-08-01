import { config } from "../../state/appState"
import type { DataRecord } from "../../map/config"

type Extremes = {
  min: DataRecord[]
  max: DataRecord[]
}

export type ExtremesResult = Record<string, Extremes>

export function computeExtremes(data: DataRecord[]): ExtremesResult {
  const layers = config.layers
  const keys = Object.values(layers).map((l) => l.measurementKey)

  const result: ExtremesResult = {}
  const minValues: Record<string, number> = {}
  const maxValues: Record<string, number> = {}

  for (const key of keys) {
    result[key] = { min: [], max: [] }
    minValues[key] = Infinity
    maxValues[key] = -Infinity
  }

  for (const item of data) {
    for (const key of keys) {
      const rawVal = item[key]
      if (rawVal === null || rawVal === undefined) continue
      const val = Number(rawVal)
      if (val < minValues[key]) minValues[key] = val
      if (val > maxValues[key]) maxValues[key] = val
    }
  }

  for (const item of data) {
    for (const key of keys) {
      const rawVal = item[key]
      if (rawVal === null || rawVal === undefined) continue
      const val = Number(rawVal)
      if (val === minValues[key]) result[key].min.push(item)
      if (val === maxValues[key]) result[key].max.push(item)
    }
  }

  return result
}
