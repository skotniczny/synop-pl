import { type LayerKey } from "../config"

const key: LayerKey = "wilgotnosc_wzgledna"

export const humidityColors = [
  "interpolate",
  ["linear"],
  ["to-number", ["get", key]],
  0,
  "#e0f3ff",
  30,
  "#a6d8ff",
  60,
  "#6bbcff",
  80,
  "#339fff",
  100,
  "#0077ff",
]
