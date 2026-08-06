import DataTable from "datatables.net-dt"
import { state, config } from "../../state/appState"
import type { DataRecord } from "../../map/config"
import { elt } from "../dom"
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import "./dataTable.css"

const tableEl = elt("table", { className: "stripe hover" })
const buttonEl = createToggleButton()
let containerEl: HTMLDivElement | null = null
let table: InstanceType<typeof DataTable> | null = null

const tableConfig = {
  paging: true,
  pageLength: 100,
  language: {
    info: "Wyświetlanie wierszy od _START_ do _END_ z _TOTAL_",
    infoEmpty: "Brak dostępnych wierszy",
    emptyTable: "Brak danych",
    infoFiltered: "(filtrowano z _MAX_ wszystkich wierszy)",
    lengthMenu: "Pokaż _MENU_ wierszy na stronę",
    search: "Przeszukaj: ",
    zeroRecords: "Nic nie znaleziono",
  },
  scrollX: true,
  scrollCollapse: true,
  scrollY: "calc(100vh - 158px)",
}

function createDataTable(el: HTMLTableElement, data: DataRecord[]) {
  return new DataTable(el, {
    data,
    columns: config.tableColumns,
    ...tableConfig,
  })
}

function applyDataTableVisibility() {
  containerEl?.classList.toggle("show", state.datatableVisible)
  buttonEl.ariaExpanded = String(state.datatableVisible)
}

function createToggleButton(): HTMLButtonElement {
  const arrow = elt("span", { className: "tabs_icon" }, "▲")
  const tab = elt("button", { className: "tabs", type: "button" }, "Dane tabelaryczne", arrow)
  tab.addEventListener("click", () => {
    state.datatableVisible = !state.datatableVisible
    applyDataTableVisibility()
  })
  return tab
}

export function initDataTable(selector: string, data: DataRecord[]) {
  containerEl = document.querySelector<HTMLDivElement>(selector)
  if (!containerEl) throw new Error(`Element not found for selector: ${selector}`)
  containerEl.append(buttonEl, tableEl)
  table = createDataTable(tableEl, data)
  applyDataTableVisibility()
}

export function updateDataTable(data: DataRecord[]) {
  if (!table) return
  table.destroy()
  tableEl.replaceChildren()
  table = createDataTable(tableEl, data)
}

export function hideDataTable() {
  if (state.datatableVisible) {
    state.datatableVisible = false
    applyDataTableVisibility()
  }
}
