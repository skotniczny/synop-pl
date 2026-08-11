import { dateTimeFormat } from "../utils/formats"
import { makeSynopISOString } from "../utils/date"
import { config } from "../state/appState"

function row(label: string, value: string | number | null, unit: string) {
  return `<tr><td>${label}</td><td class="text-right"><strong>${value ?? "—"}</strong>${unit}</td></tr>`
}

function windRow(label: string, value: string | number | null, unit: string, windDirection: string) {
  return `<tr>
    <td>${label}</td>
      <td class="text-right">
        ${windDirection && windDirection != "0" ? `<span class="d-inline-block" title="${windDirection}°" style="transform: rotate(${windDirection}deg)">⮟</span>` : ""}
      <strong>${value ?? "—"}</strong>${unit}
    </td>
  </tr>`
}

export function createStationPopup(feature: maplibregl.GeoJSONFeature): string {
  const p = feature.properties
  const layers = config.layers
  let date = new Date()
  if (p.data_pomiaru && p.godzina_pomiaru) {
    date = new Date(makeSynopISOString(p.data_pomiaru, p.godzina_pomiaru))
  }
  const rows = Object.entries(layers)
    .map(([key, { label, unit }]) => {
      const labelFormat = label.toLocaleLowerCase()
      return key === "predkosc_wiatru"
        ? windRow(labelFormat, p[key], unit, p.kierunek_wiatru)
        : row(labelFormat, p[key], unit)
    })
    .join("\n")

  const stationName = p[config.stationNameKey] ?? p.stacja ?? ""
  return `
    <div class="head">
      <strong>${stationName}</strong><br>
      ${p.nazwa_stacji && p.nazwa_stacji.toLowerCase() !== stationName.toLowerCase() ? `<small>${p.nazwa_stacji}</small><br>` : ""}
      ${p.altitude ? `wysokość <em>${p.altitude}</em> m npm<br>` : ""}
    </div>
    <table>
      ${p.data_pomiaru ? `<tr><td>data</td><td class="text-right"><time>${dateTimeFormat.format(date)}</time></td></tr>` : ""}
      ${rows}
    </table>`
}
