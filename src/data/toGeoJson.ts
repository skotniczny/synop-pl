import { type SynopRecord } from "../api/fetch"
import { stations } from "./imgw-stations"

export function toGeoJSON(data: SynopRecord[]): maplibregl.GeoJSONSourceSpecification {
  const synopMap = new Map(data.map((item) => [item.id_stacji, item]))
  const features = stations.map((station) => {
    const synopRecord = synopMap.get(station.id)
    const baseProps = {
      stacja: station.station,
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
