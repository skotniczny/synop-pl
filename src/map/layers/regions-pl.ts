// granice województw
export const regionsPlLayer: maplibregl.AddLayerObject = {
  id: "regions",
  type: "line",
  source: "regions",
  paint: {
    "line-color": "#fff",
  },
}
