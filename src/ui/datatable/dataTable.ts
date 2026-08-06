import DataTable from "datatables.net-dt"
import { state, config } from "../../state/appState"
import type { DataRecord } from "../../map/config"
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import "./dataTable.css"

let containerEl: HTMLDivElement | null = null
let tableEl: HTMLTableElement | null = null
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
}

export function initDataTable(selector: string, data: DataRecord[]) {
  containerEl = document.querySelector<HTMLDivElement>(selector)
  if (!containerEl) throw new Error(`Element not found for selector: ${selector}`)
  applyDataTableVisibility()
  tableEl = containerEl.querySelector<HTMLTableElement>("table")
  if (!tableEl) throw new Error("Element not found for selector: table")
  table = createDataTable(tableEl, data)

  containerEl.querySelector<HTMLDivElement>(".tabs")?.addEventListener("click", () => {
    state.datatableVisible = !state.datatableVisible
    applyDataTableVisibility()
  })
}

export function updateDataTable(data: DataRecord[]) {
  if (!table || !tableEl) return
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
