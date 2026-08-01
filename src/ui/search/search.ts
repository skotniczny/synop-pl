import { elt } from "../dom"
import { config } from "../../state/appState"

export function initSearch(container: string, map: maplibregl.Map): void {
  const searchInput = elt("input", { className: "form-ctrl", type: "search", placeholder: "wyszukaj" })
  const form = elt("form", {}, searchInput)
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const query = searchInput.value.trim().toLocaleLowerCase()
    if (!query) return
    const stations = config.stations
    const station = stations.find((item) => item.name.toLocaleLowerCase().includes(query))
    if (!station) return
    const { longitude, latitude } = station
    if (!longitude || !latitude) return
    map.flyTo({
      center: [longitude, latitude],
      zoom: 8,
    })
    searchInput.value = ""
  })
  document.querySelector(container)?.replaceChildren(form)
}
