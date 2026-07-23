import STATIONS_JSON from "./imgw-stations.json" with { type: "json" }

type Station = {
  id: string
  station: string
  name: string
  longitude: number
  latitude: number
  altitude: number
}

export const stations = STATIONS_JSON as Station[]

export const stationMap = new Map<string, Station>(stations.map((station) => [station.id, station]))
