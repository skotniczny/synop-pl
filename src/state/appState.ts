import { type SourceName, sourceConfigs } from "../map/config"

type AppState = {
  selectedLayer: string
  labelsVisible: boolean
  datatableVisible: boolean
  source: SourceName
}

const defaultState: AppState = {
  selectedLayer: "temperatura_format",
  labelsVisible: false,
  datatableVisible: false,
  source: "synop",
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem("synoppl-app-state")
    if (!raw) return defaultState
    const parsed = JSON.parse(raw)

    return {
      ...defaultState,
      ...parsed,
    }
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
    if (prop === "source") config = sourceConfigs[target.source]
    return true
  },
})
