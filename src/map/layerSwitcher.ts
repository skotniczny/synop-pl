import { temperatureColors } from "./palettes/temperature"
import { humidityColors } from "./palettes/humidity"
import { pressureColors } from "./palettes/pressure"
import { rainColors } from "./palettes/rain"
import { windSpeedColors } from "./palettes/wind"
import { state } from "../state/appState"
import { setHighlightedProperty } from "../ui/highlightwidget/highlightWidget"

export type LayerKey =
  "temperatura_format" | "cisnienie_format" | "wilgotnosc_wzgledna" | "predkosc_wiatru" | "suma_opadu"

export type SynopKey = "temperatura" | "cisnienie" | "wilgotnosc_wzgledna" | "predkosc_wiatru" | "suma_opadu"

type Config = {
  label: string
  filter: maplibregl.FilterSpecification | null
  color: unknown[]
  synopKey: SynopKey
  unit: string
}

const configs: { [Key in LayerKey]: Config } = {
  temperatura_format: {
    label: "Temperatura powietrza",
    filter: null,
    color: temperatureColors,
    synopKey: "temperatura",
    unit: " °C",
  },
  cisnienie_format: {
    label: "Ciśnienie atmosferyczne",
    filter: ["all", ["!=", ["get", "cisnienie_format"], null]],
    color: pressureColors,
    synopKey: "cisnienie",
    unit: " hPa",
  },
  wilgotnosc_wzgledna: {
    label: "Wilgotność powietrza",
    filter: null,
    color: humidityColors,
    synopKey: "wilgotnosc_wzgledna",
    unit: "%",
  },
  predkosc_wiatru: {
    label: "Kierunek i prędkość wiatru",
    filter: null,
    color: windSpeedColors,
    synopKey: "predkosc_wiatru",
    unit: " m/s",
  },
  suma_opadu: {
    label: "Suma opadu",
    filter: ["all", ["!=", ["get", "suma_opadu"], "0"]],
    color: rainColors,
    synopKey: "suma_opadu",
    unit: " mm",
  },
}

export const layerKeys = Object.entries(configs).map(([key, val]) => [key as LayerKey, val.label, val.unit])

export function setParameter(map: maplibregl.Map, param: LayerKey) {
  map.setLayoutProperty("stations-text", "text-field", ["to-string", ["get", param]])

  const cfg: Config = configs[param]
  map.setFilter("stations-circle", cfg.filter)
  map.setFilter("stations-text", cfg.filter)
  map.setPaintProperty("stations-circle", "circle-color", cfg.color)
  map.setLayoutProperty("stations-triangle", "visibility", param === "predkosc_wiatru" ? "visible" : "none")
  setHighlightedProperty(cfg.synopKey, cfg.unit)
  state.selectedLayer = param
}
