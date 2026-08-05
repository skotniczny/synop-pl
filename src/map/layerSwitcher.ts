import { state, config } from "../state/appState"
import { setHighlightedProperty } from "../ui/highlightwidget/highlightWidget"

export function setParameter(map: maplibregl.Map, param: string) {
  state.selectedLayer = param
  const layerCfg = config.layers[state.selectedLayer]

  map.setLayoutProperty("stations-text", "text-field", ["to-string", ["get", state.selectedLayer]])
  map.setFilter("stations-circle", layerCfg.filter)
  map.setFilter("stations-text", layerCfg.filter)
  map.setPaintProperty("stations-circle", "circle-color", layerCfg.color)
  map.setLayoutProperty("stations-triangle", "visibility", state.selectedLayer === "predkosc_wiatru" ? "visible" : "none")
  setHighlightedProperty(layerCfg)
}
