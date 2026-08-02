import { type SynopRecord } from "../api/fetch"
import { synopStations } from "./imgw-stations"

export function synopToGeoJSON(data: SynopRecord[]): maplibregl.GeoJSONSourceSpecification {
  const synopMap = new Map(data.map((item) => [item.id_stacji, item]))
  const features = synopStations.map((station) => {
    const synopRecord = synopMap.get(station.wmoCode)
    const baseProps = {
      stacja: station.name,
      nazwa_stacji: station.name,
      altitude: station.altitude,
    }
    const properties = synopRecord
      ? {
          ...baseProps,
          ...synopRecord,
          temperatura_format: Number(synopRecord.temperatura).toFixed(1),
          cisnienie_format: Math.round(Number(synopRecord.cisnienie)) || null,
        }
      : baseProps

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [station.longitude, station.latitude],
      },
      properties,
    }
  })
  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features,
    },
  }
}
