import { type SynopRecord } from "../api/fetch"
import { stationMap } from "./imgw-stations"

export function toGeoJSON(data: SynopRecord[]): maplibregl.GeoJSONSourceSpecification {
  const features = data
    .map((record) => {
      const station = stationMap.get(record.id_stacji)
      if (!station) return null

      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [station.longitude, station.latitude],
        },
        properties: {
          ...record,
          nazwa_stacji: station.name,
          altitude: station.altitude,
          temperatura_format: parseFloat(record.temperatura).toFixed(1),
          cisnienie_format: Math.round(parseFloat(record.cisnienie)) || null,
        },
      }
    })
    .filter(Boolean)
  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features,
    },
  }
}
