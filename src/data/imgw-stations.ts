import STATIONS from "./imgw-stations.json" with { type: "json" }

type Station = {
  id: string
  name: string
  longitude: number
  latitude: number
  altitude: number
}

export const stationMap = new Map<string, Station>(STATIONS.map((station) => [station.id, station]))
