import { type LayerKey } from "../map/config"

type AppState = {
  selectedLayer: LayerKey
  labelsVisible: boolean
  datatableVisible: boolean
}

const defaultState: AppState = {
  selectedLayer: "temperatura_format",
  labelsVisible: false,
  datatableVisible: false,
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

export const state = new Proxy(loadState(), {
  set<K extends keyof AppState>(target: AppState, prop: K, value: AppState[K]) {
    target[prop] = value
    saveState(target)
    return true
  },
})
