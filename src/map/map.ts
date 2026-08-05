import maplibregl, { AttributionControl } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import "./style.css"
import { regionsPl } from "../data/regionsPl"
import { stationsNameLayer } from "./layers/stations-name"
import { stationsTextLayer } from "./layers/stations-text"
import { stationsMarkerLayer } from "./layers/stations-marker"
import { stationsCircleLayer } from "./layers/stations-circle"
import { regionsPlLayer } from "./layers/regions-pl"
import { state } from "../state/appState"
import { createStationPopup } from "./popupTemplate"
import { stationsTriangleLayer } from "./layers/stations-triangle"
import type { LayerConfig } from "./config"
import { contrastTextColor } from "./palettes/contrast"

export function initMap(
  elementId: string,
  sourceSpec: maplibregl.GeoJSONSourceSpecification,
  onLoad?: (map: maplibregl.Map) => void,
) {
  const map = new maplibregl.Map({
    container: elementId,
    style: "https://demotiles.maplibre.org/globe.json",
    center: [19, 52],
    zoom: 5.7,
    attributionControl: false,
  })

  map.addControl(
    new AttributionControl({
      customAttribution:
        "Źródłem pochodzenia danych jest Instytut Meteorologii i Gospodarki Wodnej – Państwowy Instytut Badawczy",
    }),
  )

  map.on("load", () => {
    map.addSource("regions", regionsPl)
    map.addLayer(regionsPlLayer)
    map.addSource("stations", sourceSpec)
    map.addLayer(stationsTriangleLayer)
    map.addLayer(stationsMarkerLayer)
    map.addLayer(stationsCircleLayer)
    map.addLayer(stationsTextLayer)
    map.addLayer(stationsNameLayer)
    map.setLayoutProperty("stations-name", "visibility", state.labelsVisible ? "visible" : "none")
    onLoad?.(map)
  })
  map.on("click", ["stations-circle", "stations-marker"], (e: maplibregl.MapLayerMouseEvent) => {
    const feature = e.features?.[0]
    if (!feature) return

    new maplibregl.Popup({ offset: 25 }).setLngLat(e.lngLat).setHTML(createStationPopup(feature)).addTo(map)
  })
  map.on("mousedown", () => {
    if (state.datatableVisible) {
      document.querySelector<HTMLDivElement>(".data")?.classList.remove("show")
      state.datatableVisible = !state.datatableVisible
    }
  })
  return map
}

export function renderStations(map: maplibregl.Map, layerKey: string, layerCfg: LayerConfig) {
  map.setLayoutProperty("stations-text", "text-field", ["to-string", ["get", layerKey]])
  map.setFilter("stations-circle", layerCfg.filter)
  map.setFilter("stations-text", layerCfg.filter)
  map.setPaintProperty("stations-circle", "circle-color", layerCfg.color)
  map.setPaintProperty("stations-text", "text-color", contrastTextColor(layerCfg.color))
  map.setLayoutProperty("stations-triangle", "visibility", layerKey === "predkosc_wiatru" ? "visible" : "none")
}

export function setStationsData(map: maplibregl.Map, data: maplibregl.GeoJSONSourceSpecification["data"]) {
  const source = map.getSource("stations") as maplibregl.GeoJSONSource
  source.setData(data)
}
