import { dateTimeFormat } from "../utils/formats"
import { createDate, makeDateISOString } from "../utils/date"

export function createStationPopup(feature: maplibregl.GeoJSONFeature): string {
  const p = feature.properties
  const date = createDate(makeDateISOString(p.data_pomiaru, p.godzina_pomiaru))
  const alternative_name = p.stacja.toLowerCase() !== p.nazwa_stacji.toLowerCase() ? p.nazwa_stacji : null
  return `
    <div class="head">
      <strong>${p.stacja}</strong><br>
      ${alternative_name ? `<small>${p.nazwa_stacji}</small><br>` : ""}
      wysokość <em>${p.altitude}</em> m npm<br>
    </div>
    <table>
      <tr><td>data</td><td class="text-right"><time>${dateTimeFormat.format(date)}</time></td></tr>
      <tr><td>temperatura</td><td class="text-right"><strong>${p.temperatura ?? "—"}</strong> °C</td></tr>
      <tr><td>wiatr</td><td class="text-right"><strong>${p.predkosc_wiatru ?? "—"}</strong> m/s</td></tr>
      <tr><td>ciśnienie</td><td class="text-right"><strong>${p.cisnienie ?? "—"}</strong> hPa</td></tr>
      <tr><td>wilgotność</td><td class="text-right"><strong>${p.wilgotnosc_wzgledna ?? "—"}</strong> %</td></tr>
      <tr><td>suma opadu</td><td class="text-right"><strong>${p.suma_opadu ?? "—"}</strong> mm</td></tr>
    </table>`
}
