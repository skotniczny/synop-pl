import { state, config } from "../state/appState"
import { setHighlightedProperty } from "../ui/highlightwidget/highlightWidget"

export function setParameter(map: maplibregl.Map, param: string) {
  const cfg = config.layers[param]
  if (!cfg) return

  map.setLayoutProperty("stations-text", "text-field", ["to-string", ["get", param]])
  map.setFilter("stations-circle", cfg.filter)
  map.setFilter("stations-text", cfg.filter)
  map.setPaintProperty("stations-circle", "circle-color", cfg.color)
  map.setLayoutProperty("stations-triangle", "visibility", param === "predkosc_wiatru" ? "visible" : "none")
  setHighlightedProperty(cfg.measurementKey, cfg.unit, cfg.showMin)
  state.selectedLayer = param
}
