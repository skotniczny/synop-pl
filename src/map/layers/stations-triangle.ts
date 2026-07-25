// Znacznik kierunku wiatru
export const stationsTriangleLayer: maplibregl.AddLayerObject = {
  id: "stations-triangle",
  type: "symbol",
  source: "stations",
  filter: ["all", ["!=", ["get", "predkosc_wiatru"], "0"]],
  layout: {
    "text-field": "▼",
    "text-size": 30,
    "text-rotate": ["to-number", ["get", "kierunek_wiatru"]],
    "text-offset": [0, 0.5],
    "text-font": ["Open Sans"],
    "text-keep-upright": false,
    "text-allow-overlap": true,
    "text-ignore-placement": true,
  },
  paint: {
    "text-color": "#000",
  },
}
