import { state, config } from "../state/appState"
import { setHighlightedProperty } from "../ui/highlightwidget/highlightWidget"

export function setParameter(map: maplibregl.Map, param: string) {
  // sources expose different layer sets — fall back to the first available layer
  const resolvedParam = param in config.layers ? param : Object.keys(config.layers)[0]
  const layerCfg = config.layers[resolvedParam]

  map.setLayoutProperty("stations-text", "text-field", ["to-string", ["get", resolvedParam]])
  map.setFilter("stations-circle", layerCfg.filter)
  map.setFilter("stations-text", layerCfg.filter)
  map.setPaintProperty("stations-circle", "circle-color", layerCfg.color)
  map.setLayoutProperty("stations-triangle", "visibility", resolvedParam === "predkosc_wiatru" ? "visible" : "none")
  setHighlightedProperty(layerCfg)
  state.selectedLayer = resolvedParam
}
