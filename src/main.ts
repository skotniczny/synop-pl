import "./style.css"
import { initMap } from "./map/initMap.ts"
import { initDataTable } from "./ui/datatable/dataTable.ts"
import { initDateTime } from "./ui/datetime/initDateTime.ts"
import { initControls } from "./ui/initControls.ts"
import { initHighlightWidget } from "./ui/highlightwidget/highlightWidget.ts"
import { state, config } from "./state/appState.ts"
import { toastDanger } from "./ui/toast/toast.ts"

const data = await config.fetchData().catch((e) => {
  const message =
    e instanceof Error
      ? `Nie udało się pobrać danych: ${e.message}`
      : "Wystąpił nieoczekiwany błąd podczas pobierania danych"
  toastDanger(message)
  return []
})
const map = initMap("map", config.toGeoJSON(data))
initDataTable("#imgwData", data)
initDateTime(document.body, data)
initControls(".control", map)
initHighlightWidget(".featured-l-b", data)

document.querySelector<HTMLDivElement>(".tabs")?.addEventListener("click", (e: PointerEvent) => {
  const target = e.currentTarget
  if (!(target instanceof HTMLDivElement)) return
  target.parentElement?.classList.toggle("show")
  state.datatableVisible = !state.datatableVisible
})
