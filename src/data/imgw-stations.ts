import STATIONS_JSON from "./imgw-stations.json" with { type: "json" }

export type Station = {
  id: string
  wmoCode: string
  isSynop: boolean
  name: string
  longitude: number | null
  latitude: number | null
  altitude: number | null
}

export const meteoStations: Station[] = STATIONS_JSON
export const synopStations: Station[] = STATIONS_JSON.filter((item) => item.isSynop)
