import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import "./style.css"
import { temperatureColors } from "./palettes/temperature"
import { regionsPl } from "../data/regionsPl"
import { stationsNameLayer } from "./layers/stations-name"
import { stationsTextLayer } from "./layers/stations-text"
import { stationsCircleLayer } from "./layers/stations-circle"
import { regionsPlLayer } from "./layers/regions-pl"
import { state } from "../state/appState"
import { setParameter } from "./layerSwitcher"
import { createStationPopup } from "./popupTemplate"

export function initMap(elementId: string, sourceSpec: maplibregl.GeoJSONSourceSpecification) {
  const map = new maplibregl.Map({
    container: elementId,
    style: "https://demotiles.maplibre.org/globe.json",
    center: [19, 52],
    zoom: 5.7,
  })

  map.on("load", () => {
    map.addSource("regions", regionsPl)
    map.addLayer(regionsPlLayer)
    map.addSource("stations", sourceSpec)
    map.addLayer(stationsCircleLayer)
    map.setPaintProperty("stations-circle", "circle-color", temperatureColors)
    map.addLayer(stationsTextLayer)
    map.addLayer(stationsNameLayer)
    map.setLayoutProperty("stations-name", "visibility", state.labelsVisible ? "visible" : "none")
    setParameter(map, state.selectedLayer)
  })
  map.on("click", "stations-circle", (e: maplibregl.MapLayerMouseEvent) => {
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
