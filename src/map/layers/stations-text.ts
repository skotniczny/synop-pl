// tekstowa ektykata pomiaru
export const stationsTextLayer: maplibregl.AddLayerObject = {
  id: "stations-text",
  type: "symbol",
  source: "stations",
  layout: {
    "text-size": 12,
    "text-offset": [0, 0],
    "text-font": ["Open Sans Semibold"],
  },
  paint: {
    "text-color": "#000",
  },
}
