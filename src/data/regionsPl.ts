import REGIONS_PL from "./regionsPl.json" with { type: "json" }

export const regionsPl: maplibregl.GeoJSONSourceSpecification = {
  type: "geojson",
  data: REGIONS_PL,
}