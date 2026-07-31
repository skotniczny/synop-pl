import { type MeteoRecord } from "../api/fetch"
import { meteoStations } from "./imgw-stations"

export function meteoToGeoJSON(data: MeteoRecord[]): maplibregl.GeoJSONSourceSpecification {
  const meteoMap = new Map(data.map((item) => [item.kod_stacji, item]))
  const features = meteoStations.map((station) => {
    const meteoRecord = meteoMap.get(station.id)
    const baseProps = {
      stacja: station.name,
      nazwa_stacji: station.name,
      altitude: station.altitude,
    }
    const properties = meteoRecord
      ? {
          ...baseProps,
          ...meteoRecord,
          wilgotnosc_wzgledna: meteoRecord.wilgotnosc_wzgledna,
          predkosc_wiatru: meteoRecord.wiatr_srednia_predkosc,
          kierunek_wiatru: meteoRecord.wiatr_kierunek,
          suma_opadu: meteoRecord.opad_10min,
          temperatura: meteoRecord.temperatura_powietrza,
          temperatura_format: meteoRecord.temperatura_powietrza
            ? Number(meteoRecord.temperatura_powietrza).toFixed(1)
            : null,
          cisnienie_format: null,
        }
      : baseProps

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [Number(station.longitude), Number(station.latitude)],
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
