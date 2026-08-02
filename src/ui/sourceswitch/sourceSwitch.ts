import { createRadioList } from "../radiolist/radioList"
import { state, config } from "../../state/appState"
import { updateControls } from "../controls/controls"
import { updateHighlightWidget } from "../highlightwidget/highlightWidget"
import { updateDateTime } from "../datetime/initDateTime"
import { updateDataTable } from "../datatable/dataTable"
import { setParameter } from "../../map/layerSwitcher"
import { type DataRecord, type SourceName } from "../../map/config"

export function initSourceSwitch(selector: string, map: maplibregl.Map, onError: (e: unknown) => DataRecord[]) {
  document.querySelector(selector)?.append(
    createRadioList(
      [
        { key: "synop", label: "Synop", checked: state.source === "synop" },
        { key: "meteo", label: "Meteo", checked: state.source === "meteo" },
      ],
      async (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
          state.source = e.target.value as SourceName
          const data = await config.fetchData().catch(onError)
          const source = map.getSource("stations") as maplibregl.GeoJSONSource
          source.setData(config.toGeoJSON(data).data as maplibregl.GeoJSONSourceSpecification["data"])
          updateHighlightWidget(data)
          setParameter(map, state.selectedLayer)
          updateControls()
          updateDateTime(data)
          updateDataTable(data)
        }
      },
    ),
  )
}
