import { type SynopRecord } from "../../api/fetch"
import { type SynopKey } from "../../map/config"

type Extremes = {
  min: SynopRecord[]
  max: SynopRecord[]
}

export type ExtremesResult = Record<SynopKey, Extremes>

export function computeExtremes(stations: SynopRecord[]): ExtremesResult {
  const result: ExtremesResult = {
    temperatura: { min: [], max: [] },
    predkosc_wiatru: { min: [], max: [] },
    wilgotnosc_wzgledna: { min: [], max: [] },
    suma_opadu: { min: [], max: [] },
    cisnienie: { min: [], max: [] },
  }

  const minValues: Record<SynopKey, number> = {
    temperatura: Infinity,
    predkosc_wiatru: Infinity,
    wilgotnosc_wzgledna: Infinity,
    suma_opadu: Infinity,
    cisnienie: Infinity,
  }

  const maxValues: Record<SynopKey, number> = {
    temperatura: -Infinity,
    predkosc_wiatru: -Infinity,
    wilgotnosc_wzgledna: -Infinity,
    suma_opadu: -Infinity,
    cisnienie: -Infinity,
  }

  const params = Object.keys(result) as SynopKey[]

  for (const s of stations) {
    for (const key of params) {
      const rawVal = s[key]
      if (rawVal === null) continue
      const val = Number(rawVal)
      if (val < minValues[key]) minValues[key] = val
      if (val > maxValues[key]) maxValues[key] = val
    }
  }

  for (const s of stations) {
    for (const key of params) {
      const val = Number(s[key])
      if (val === minValues[key]) result[key].min.push(s)
      if (val === maxValues[key]) result[key].max.push(s)
    }
  }

  return result
}
