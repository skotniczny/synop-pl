import { type LayerKey } from "../layerSwitcher"

const key: LayerKey = "predkosc_wiatru"

export const windSpeedColors = [
  "interpolate",
  ["linear"],
  ["*", ["to-number", ["get", key]], 3.6],
  0,
  "#e0f3ff",
  10,
  "#55aaff",
  36,
  "#00a000",
  54,
  "#66ff66",
  70,
  "#b3ffb3",
]
