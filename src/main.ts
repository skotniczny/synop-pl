import "./style.css"
import { fetchImgwSynopData } from "./api/fetch.ts"
import { toGeoJSON } from "./data/toGeoJson.ts"
import { initMap } from "./map/initMap.ts"
import { initDataTable } from "./ui/datatable/dataTable.ts"
import { initDateTime } from "./ui/datetime/initDateTime.ts"
import { initControls } from "./ui/initControls.ts"
import { layerKeys } from "./map/layerSwitcher.ts"
import { state } from "./state/appState.ts"

const data = await fetchImgwSynopData()

const map = initMap("map", toGeoJSON(data))
initDataTable("#imgwData", data)
initDateTime(document.body, data)
initControls(".control", layerKeys, map)

document.querySelector<HTMLDivElement>(".tabs")?.addEventListener("click", (e: PointerEvent) => {
  const target = e.currentTarget
  if (!(target instanceof HTMLDivElement)) return
  target.parentElement?.classList.toggle("show")
  state.datatableVisible = !state.datatableVisible
})
