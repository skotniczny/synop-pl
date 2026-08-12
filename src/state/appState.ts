import { type SourceName, sourceConfigs } from "../map/config"

type AppState = {
  selectedLayer: string
  labelsVisible: boolean
  qualityControl: boolean
  datatableVisible: boolean
  source: SourceName
}

const defaultState: AppState = {
  selectedLayer: "temperatura_format",
  labelsVisible: false,
  qualityControl: true,
  datatableVisible: false,
  source: "synop",
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem("synoppl-app-state")
    if (!raw) return defaultState
    const parsed = JSON.parse(raw)
    const restored: AppState = {
      ...defaultState,
      ...parsed,
    }
    if (!(restored.selectedLayer in sourceConfigs[restored.source].layers)) {
      restored.selectedLayer = defaultState.selectedLayer
    }

    return restored
  } catch {
    return defaultState
  }
}

function saveState(state: AppState) {
  localStorage.setItem("synoppl-app-state", JSON.stringify(state))
}

const initialState = loadState()
export let config = sourceConfigs[initialState.source]

export const state = new Proxy(initialState, {
  set<K extends keyof AppState>(target: AppState, prop: K, value: AppState[K]) {
    target[prop] = value
    saveState(target)
    if (prop === "source") {
      config = sourceConfigs[target.source]
      if (!(state.selectedLayer in config.layers)) {
        state.selectedLayer = Object.keys(config.layers)[0]
      }
    }
    return true
  },
})
