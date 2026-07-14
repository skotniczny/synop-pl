import DataTable from "datatables.net-dt"
import type { SynopRecord } from "../../api/fetch"
import { state } from "../../state/appState"
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import "./dataTable.css"

export function initDataTable(selector: string, data: SynopRecord[]) {
  new DataTable(selector, {
    data: data,
    columns: [
      { data: "id_stacji", title: "Id" },
      { data: "stacja", title: "Stacja" },
      { data: "data_pomiaru", title: "Data pomiaru" },
      { data: "godzina_pomiaru", title: "Godzina pomiaru [UTC]" },
      { data: "temperatura", title: "Temperatura [°C]" },
      { data: "predkosc_wiatru", title: "Prędkość wiatru [m/s]" },
      { data: "kierunek_wiatru", title: "Kierunek wiatru [°]" },
      { data: "wilgotnosc_wzgledna", title: "Wilgotność [%]" },
      { data: "suma_opadu", title: "Suma opadu [mm]" },
      { data: "cisnienie", title: "Ciśnienie [hPa]" },
    ],
    paging: false,
    language: {
      info: "Wyświetlanie wierszy od _START_ do _END_ z _TOTAL_",
      infoEmpty: "Brak dostępnych wierszy",
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
