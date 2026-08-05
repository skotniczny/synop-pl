import { state, config } from "../state/appState"
import { renderStations, setStationsData } from "./map"
import { updateHighlightWidget } from "../ui/highlightwidget/highlightWidget"
import type { DataRecord } from "./config"
import { updateDataTable } from "../ui/datatable/dataTable"
import { updateDateTime } from "../ui/datetime/initDateTime"

function selectLayer(param: string) {
  state.selectedLayer = param
  return config.layers[state.selectedLayer]
}

export function setParameter(map: maplibregl.Map, param: string) {
  const layerCfg = selectLayer(param)
  renderStations(map, state.selectedLayer, layerCfg)
  updateHighlightWidget(layerCfg)
}

export function setLayer(map: maplibregl.Map, param: string, data: DataRecord[]) {
  setStationsData(map, config.toGeoJSON(data).data)
  const layerCfg = selectLayer(param)
  renderStations(map, state.selectedLayer, layerCfg)
  updateHighlightWidget(layerCfg, data)
  updateDateTime(data)
  updateDataTable(data)
}
