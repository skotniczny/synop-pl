import { state, config } from "../state/appState"
import { renderStations, setStationsData } from "./map"
import { updateHighlightWidget } from "../ui/highlightwidget/highlightWidget"
import type { DataRecord, SourceName } from "./config"
import { updateDataTable } from "../ui/datatable/dataTable"
import { updateDateTime } from "../ui/datetime/initDateTime"
import { applyQualityControl } from "../data/qualityControl"

let rawData: DataRecord[] = []
let rawSource: SourceName | null = null

function currentLayer() {
  return config.layers[state.selectedLayer]
}

export function setLayer(map: maplibregl.Map, param: string) {
  state.selectedLayer = param
  const layerCfg = currentLayer()
  renderStations(map, state.selectedLayer, layerCfg)
  updateHighlightWidget(layerCfg)
  updateDateTime(layerCfg)
}

export function setData(map: maplibregl.Map, data: DataRecord[]) {
  rawData = data
  rawSource = state.source
  renderData(map)
}

export function renderData(map: maplibregl.Map) {
  if (rawSource !== state.source) return
  const data = state.qualityControl ? applyQualityControl(rawData, Date.now()) : rawData
  setStationsData(map, config.toGeoJSON(data).data)
  const layerCfg = currentLayer()
  renderStations(map, state.selectedLayer, layerCfg)
  updateHighlightWidget(layerCfg, data)
  updateDateTime(layerCfg, data)
  updateDataTable(data)
}
