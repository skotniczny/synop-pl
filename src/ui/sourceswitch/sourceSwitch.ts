import { createRadioList } from "../radiolist/radioList"
import { state, config } from "../../state/appState"
import { updateControls } from "../controls/controls"
import { setLayer } from "../../map/layerSwitcher"
import { type DataRecord, type SourceName } from "../../map/config"
import "./sourceSwitch.css"

export function initSourceSwitch(selector: string, map: maplibregl.Map, onError: (e: unknown) => DataRecord[]) {
  const radioList = createRadioList(
    [
      { key: "synop", label: "Synop", checked: state.source === "synop" },
      { key: "meteo", label: "Meteo", checked: state.source === "meteo" },
    ],
    async (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        const requestedSource = e.target.value as SourceName
        state.source = requestedSource
        updateControls()
        const data = await config.fetchData().catch(onError)
        if (state.source !== requestedSource) return
        setLayer(map, state.selectedLayer, data)
      }
    },
  )
  radioList.classList.add("source-switch")
  document.querySelector(selector)?.append(radioList)
}
