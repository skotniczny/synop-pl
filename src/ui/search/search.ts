import { elt } from "../dom"
import { config } from "../../state/appState"

function showPulse(map: maplibregl.Map, coordinates: [number, number]) {
  const source = map.getSource("search-hit") as maplibregl.GeoJSONSource
  source.setData({ type: "Point", coordinates })
  map.setLayoutProperty("search-pulse", "visibility", "visible")

  const hide = () => hidePulse(map)
  document.addEventListener("pointerdown", hide, { once: true })
  document.addEventListener("keydown", hide, { once: true })
}

function hidePulse(map: maplibregl.Map) {
  map.setLayoutProperty("search-pulse", "visibility", "none")
}

export function createSearch(map: maplibregl.Map): HTMLFormElement {
  const searchInput = elt("input", {
    className: "form-ctrl",
    type: "search",
    placeholder: "Wyszukaj",
    ariaLabel: "wyszukaj stację",
  })
  const form = elt("form", { className: "form-group p-0 mb-sm" }, searchInput)
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const query = searchInput.value.trim().toLocaleLowerCase()
    if (!query) return
    const station = config.stations.find((item) => item.name.toLocaleLowerCase().includes(query))
    if (!station) return
    const coordinates: [number, number] = [station.longitude, station.latitude]
    showPulse(map, coordinates)
    map.flyTo({
      center: coordinates,
      zoom: 8,
    })
    searchInput.value = ""
  })
  return form
}
