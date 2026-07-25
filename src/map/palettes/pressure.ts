import { type LayerKey } from "../config"

const key: LayerKey = "cisnienie_format"

export const pressureColors = [
  "interpolate",
  ["linear"],
  ["to-number", ["get", key]],
  980,
  "#4575b4",
  1000,
  "#74add1",
  1010,
  "#fee090",
  1020,
  "#f46d43",
  1040,
  "#a50026",
]
