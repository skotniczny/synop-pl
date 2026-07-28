import { elt } from "../dom"
import { stations } from "../../data/imgw-stations"

export function initSearch(container: string, map: maplibregl.Map): void {
  const searchInput = elt("input", {className: "form-ctrl", type: "search", placeholder: "wyszukaj"})
  const form = elt("form", {}, searchInput)
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const query = searchInput.value.trim().toLocaleLowerCase()
    if (!query) return
    const station = stations.find(item => item.name.toLocaleLowerCase().includes(query))
    if (!station) return
    map.flyTo({
      center: [station.longitude, station.latitude],
      zoom: 9
    })
    searchInput.value = ""
  })
  document.querySelector(container)?.replaceChildren(form)
}
