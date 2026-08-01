import DataTable from "datatables.net-dt"
import { state, config } from "../../state/appState"
import type { DataRecord } from "../../map/config"
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import "./dataTable.css"

let table: InstanceType<typeof DataTable> | null = null
let tableSelector: string

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

export function initDataTable(selector: string, data: DataRecord[]) {
  tableSelector = selector
  table = new DataTable(selector, {
    data,
    columns: config.tableColumns,
    ...tableConfig,
  })

  const dataView = document.querySelector<HTMLDivElement>(".data")

  if (state.datatableVisible) {
    dataView?.classList.add("show")
  } else {
    dataView?.classList.remove("show")
  }
}

export function updateDataTable(data: DataRecord[]) {
  if (table) table.destroy()
  document.querySelector(tableSelector)?.replaceChildren()
  table = new DataTable(tableSelector, {
    data,
    columns: config.tableColumns,
    ...tableConfig,
  })
}
