import STATIONS_JSON from "./imgw-stations.json" with { type: "json" }

export type Station = {
  id: string
  wmoCode: string
  isSynop: boolean
  name: string
  longitude: number
  latitude: number
  altitude: number | null
}

const stations: Station[] = STATIONS_JSON.filter((item) => item.longitude !== null && item.latitude !== null)
export const meteoStations: Station[] = stations
export const synopStations: Station[] = stations.filter((item) => item.isSynop)
