import { type LayerKey } from "../config"

const key: LayerKey = "suma_opadu"

export const rainColors = [
  "interpolate",
  ["linear"],
  ["to-number", ["get", key]],
  0,
  "#f2f8ff",
  1,
  "#d6eaff",
  5,
  "#a8d2ff",
  10,
  "#7bbaff",
  20,
  "#4d9aff",
  30,
  "#1f7fff",
  50,
  "#004b8c",
]
