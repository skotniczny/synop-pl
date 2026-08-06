import DataTable from "datatables.net-dt"
import { state, config } from "../../state/appState"
import type { DataRecord } from "../../map/config"
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import "./dataTable.css"

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

export function initDataTable(selector: string, data: DataRecord[]) {
  const dataView = document.querySelector<HTMLDivElement>(selector)
  if (!dataView) throw new Error(`Element not found for selector: ${selector}`)
  dataView.classList.toggle("show", state.datatableVisible)
  tableEl = dataView.querySelector<HTMLTableElement>("table")
  if (!tableEl) throw new Error("Element not found for selector: table")
  table = createDataTable(tableEl, data)

  dataView.querySelector<HTMLDivElement>(".tabs")?.addEventListener("click", () => {
    state.datatableVisible = !state.datatableVisible
    dataView.classList.toggle("show", state.datatableVisible)
  })
}

export function updateDataTable(data: DataRecord[]) {
  if (!table || !tableEl) return
  table.destroy()
  tableEl.replaceChildren()
  table = createDataTable(tableEl, data)
}
