import DataTable from "datatables.net-dt"
import { state, config } from "../../state/appState"
import type { DataRecord } from "../../map/config"
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import "./dataTable.css"

export function initDataTable(selector: string, data: DataRecord[]) {
  new DataTable(selector, {
    data: data,
    columns: config.tableColumns,
    paging: false,
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
  })

  const dataView: HTMLDivElement | null = document.querySelector<HTMLDivElement>(".data")

  if (state.datatableVisible) {
    dataView?.classList.add("show")
  } else {
    dataView?.classList.remove("show")
  }
}
