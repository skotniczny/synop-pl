import { state } from "../state/appState"
import { setHighlightedProperty } from "../ui/highlightwidget/highlightWidget"
import { configs, type LayerKey } from "./config"

export function setParameter(map: maplibregl.Map, param: LayerKey) {
  map.setLayoutProperty("stations-text", "text-field", ["to-string", ["get", param]])

  const cfg = configs[param]
  map.setFilter("stations-circle", cfg.filter)
  map.setFilter("stations-text", cfg.filter)
  map.setPaintProperty("stations-circle", "circle-color", cfg.color)
  map.setLayoutProperty("stations-triangle", "visibility", param === "predkosc_wiatru" ? "visible" : "none")
  setHighlightedProperty(cfg.synopKey, cfg.unit)
  state.selectedLayer = param
}
