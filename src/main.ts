import "./style.css"
import { initMap } from "./map/map.ts"
import { hideDataTable, initDataTable } from "./ui/datatable/dataTable.ts"
import { initDateTime } from "./ui/datetime/initDateTime.ts"
import { initControls } from "./ui/controls/controls.ts"
import { initHighlightWidget } from "./ui/highlightwidget/highlightWidget.ts"
import { state, config } from "./state/appState.ts"
import { toastDanger } from "./ui/toast/toast.ts"
import { initSourceSwitch } from "./ui/sourceswitch/sourceSwitch.ts"
import type { DataRecord } from "./map/config.ts"
import { setLayer, setData } from "./map/layerSwitcher.ts"

function loadData(): Promise<DataRecord[]> {
  return config.fetchData().catch((e) => {
    const message =
      e instanceof Error
        ? `Nie udało się pobrać danych: ${e.message}`
        : "Wystąpił nieoczekiwany błąd podczas pobierania danych"
    toastDanger(message)
    return []
  })
}

const dataPromise = loadData()
const map = initMap("map", config.toGeoJSON([]), async (map) => {
  setLayer(map, state.selectedLayer)
  initControls(".featured-l-t", map)
  const data = await dataPromise
  setData(map, data)
  initSourceSwitch(".featured-c-t", map, loadData)
})
map.on("mousedown", hideDataTable)

initDataTable(".data", [])
initDateTime(".featured-r-t")
initHighlightWidget(".featured-l-b", [])
