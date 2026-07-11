// tekstowe etykiety stacji pomiarowych
export const stationsNameLayer: maplibregl.AddLayerObject = {
  id: "stations-name",
  type: "symbol",
  source: "stations",
  layout: {
    "text-field": ["get", "stacja"],
    "text-size": 10,
    "text-offset": [0, -2.5],
  },
  paint: {
    "text-color": "#000",
  },
}
