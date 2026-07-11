import { temperatureColors } from "./palettes/temperature"
import { humidityColors } from "./palettes/humidity"
import { pressureColors } from "./palettes/pressure"
import { rainColors } from "./palettes/rain"
import { windSpeedColors } from "./palettes/wind"
import { state } from "../state/appState"

export type LayerKey =
  "temperatura_format" | "cisnienie_format" | "wilgotnosc_wzgledna" | "predkosc_wiatru" | "suma_opadu"

type Config = {
  label: string
  filter: maplibregl.FilterSpecification | null
  color: unknown[]
}

const configs: { [Key in LayerKey]: Config } = {
  temperatura_format: {
    label: "Temperatura powietrza [°C]",
    filter: null,
    color: temperatureColors,
  },
  cisnienie_format: {
    label: "Ciśnienie atmosferyczne [hPa]",
    filter: ["all", ["!=", ["get", "cisnienie_format"], null]],
    color: pressureColors,
  },
  wilgotnosc_wzgledna: {
    label: "Wilgotność powietrza [%]",
    filter: null,
    color: humidityColors,
  },
  predkosc_wiatru: {
    label: "Prędkość wiatru [m/s]",
    filter: null,
    color: windSpeedColors,
  },
  suma_opadu: {
    label: "Suma opadu [mm]",
    filter: ["all", ["!=", ["get", "suma_opadu"], "0"]],
    color: rainColors,
  },
}

export const layerKeys = Object.entries(configs).map(([key, val]) => [key as LayerKey, val.label])

export function setParameter(map: maplibregl.Map, param: LayerKey) {
  map.setLayoutProperty("stations-text", "text-field", ["to-string", ["get", param]])

  const cfg: Config = configs[param]
  map.setFilter("stations-circle", cfg.filter)
  map.setFilter("stations-text", cfg.filter)
  map.setPaintProperty("stations-circle", "circle-color", cfg.color)
  state.selectedLayer = param
}
