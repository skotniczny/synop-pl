// measurement markers — filter and colour set per parameter
export const stationsCircleLayer: maplibregl.AddLayerObject = {
  id: "stations-circle",
  type: "circle",
  source: "stations",
  paint: {
    "circle-radius": 15,
    "circle-stroke-color": "#000",
    "circle-stroke-width": 2,
  },
}
