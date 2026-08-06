import "./style.css"
import { initMap } from "./map/map.ts"
import { initDataTable } from "./ui/datatable/dataTable.ts"
import { initDateTime } from "./ui/datetime/initDateTime.ts"
import { initControls } from "./ui/controls/controls.ts"
import { initHighlightWidget } from "./ui/highlightwidget/highlightWidget.ts"
import { state, config } from "./state/appState.ts"
import { toastDanger } from "./ui/toast/toast.ts"
import { initSourceSwitch } from "./ui/sourceswitch/sourceSwitch.ts"
import type { DataRecord } from "./map/config.ts"
import { setParameter } from "./map/layerSwitcher.ts"

function handleFetchError(e: unknown): DataRecord[] {
  const message =
    e instanceof Error
      ? `Nie udało się pobrać danych: ${e.message}`
      : "Wystąpił nieoczekiwany błąd podczas pobierania danych"
  toastDanger(message)
  return []
}

const data = await config.fetchData().catch(handleFetchError)
const map = initMap("map", config.toGeoJSON(data), (map) => setParameter(map, state.selectedLayer))
initDataTable(".data", data)
initDateTime(document.body, data)
initControls(".featured-l-t", map)
initHighlightWidget(".featured-l-b", data)
initSourceSwitch(".featured-c-t", map, handleFetchError)
