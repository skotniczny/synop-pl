// pulsing dot under the station found by search
// allow-overlap and ignore-placement, otherwise the label engine hides it on collision
export const searchPulseLayer: maplibregl.AddLayerObject = {
  id: "search-pulse",
  type: "symbol",
  source: "search-hit",
  layout: {
    "icon-image": "pulsing-dot",
    "icon-allow-overlap": true,
    "icon-ignore-placement": true,
    visibility: "none",
  },
}
