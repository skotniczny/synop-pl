// unfiltered station dots — visible where stations-circle has no data to show
export const stationsMarkerLayer: maplibregl.AddLayerObject = {
  id: "stations-marker",
  type: "circle",
  source: "stations",
  paint: {
    "circle-radius": 5,
    "circle-color": "#eee",
    "circle-stroke-color": "#000",
    "circle-stroke-width": 2,
  },
}
