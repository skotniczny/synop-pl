import { elt } from "../dom"
import { config } from "../../state/appState"

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
    map.flyTo({
      center: [station.longitude, station.latitude],
      zoom: 8,
    })
    searchInput.value = ""
  })
  return form
}
