import { state, config } from "../state/appState"
import { renderStations, setStationsData } from "./map"
import { updateHighlightWidget } from "../ui/highlightwidget/highlightWidget"
import type { DataRecord, SourceName } from "./config"
import { updateDataTable } from "../ui/datatable/dataTable"
import { updateDateTime } from "../ui/datetime/initDateTime"
import { applyQualityControl } from "../data/qualityControl"

let rawData: DataRecord[] = []
let rawSource: SourceName | null = null

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
  rawData = data
  rawSource = state.source
  renderData(map, param)
}

export function renderData(map: maplibregl.Map, param: string) {
  if (rawSource !== state.source) return
  const data = state.qualityControl ? applyQualityControl(rawData, Date.now()) : rawData
  setStationsData(map, config.toGeoJSON(data).data)
  const layerCfg = selectLayer(param)
  renderStations(map, state.selectedLayer, layerCfg)
  updateHighlightWidget(layerCfg, data)
  updateDateTime(data)
  updateDataTable(data)
}
