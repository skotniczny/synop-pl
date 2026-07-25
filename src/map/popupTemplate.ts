import { dateTimeFormat } from "../utils/formats"
import { createDate, makeDateISOString } from "../utils/date"
import { configs } from "./config"

function row(label: string, value: string | number | null, unit: string) {
  return `<tr><td>${label}</td><td class="text-right"><strong>${value ?? "—"}</strong>${unit}</td></tr>`
}

function windRow(label: string, value: string | number | null, unit: string, windDirection: string) {
  return `<tr>
    <td>${label}</td>
      <td class="text-right">
        ${windDirection ? `<span class="d-inline-block" title="${windDirection}°" style="transform: rotate(${windDirection}deg)">⮟</span>` : ""}
      <strong>${value ?? "—"}</strong>${unit}
    </td>
  </tr>`
}

export function createStationPopup(feature: maplibregl.GeoJSONFeature): string {
  const p = feature.properties
  let date = new Date()
  if (p.data_pomiaru && p.godzina_pomiaru) {
    date = createDate(makeDateISOString(p.data_pomiaru, p.godzina_pomiaru))
  }
  const rows = Object.entries(configs)
    .map(([key, { label, unit }]) => {
      const labelFormat = label.toLocaleLowerCase()
      return key === "predkosc_wiatru"
        ? windRow(labelFormat, p[key], unit, p.kierunek_wiatru)
        : row(labelFormat, p[key], unit)
    })
    .join("\n")

  const alternative_name = p.stacja.toLowerCase() !== p.nazwa_stacji.toLowerCase() ? p.nazwa_stacji : null
  return `
    <div class="head">
      <strong>${p.stacja}</strong><br>
      ${alternative_name ? `<small>${p.nazwa_stacji}</small><br>` : ""}
      wysokość <em>${p.altitude}</em> m npm<br>
    </div>
    <table>
      <tr><td>data</td><td class="text-right"><time>${dateTimeFormat.format(date)}</time></td></tr>
      ${rows}
    </table>`
}
