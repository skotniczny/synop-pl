// Pulsująca kropka pod znalezioną stacją — rysunek dostarcza obrazek pulsing-dot
// allow-overlap i ignore-placement, inaczej silnik etykiet chowa ikonę przy kolizji z podpisami
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
