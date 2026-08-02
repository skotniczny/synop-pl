import { state, config } from "../state/appState"
import { setHighlightedProperty } from "../ui/highlightwidget/highlightWidget"

export function setParameter(map: maplibregl.Map, param: string) {
  const layerCfg = config.layers[param]
  if (!layerCfg) return

  map.setLayoutProperty("stations-text", "text-field", ["to-string", ["get", param]])
  map.setFilter("stations-circle", layerCfg.filter)
  map.setFilter("stations-text", layerCfg.filter)
  map.setPaintProperty("stations-circle", "circle-color", layerCfg.color)
  map.setLayoutProperty("stations-triangle", "visibility", param === "predkosc_wiatru" ? "visible" : "none")
  setHighlightedProperty(layerCfg)
  state.selectedLayer = param
}
