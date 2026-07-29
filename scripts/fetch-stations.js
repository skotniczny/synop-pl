import { writeFile } from "node:fs/promises"

try {
  const [stationRequest, synopRequest, meteoRequest] = await Promise.all([
    fetch("https://klimat.imgw.pl/json/stacje.json"),
    fetch("https://danepubliczne.imgw.pl/api/data/synop/"),
    fetch("https://danepubliczne.imgw.pl/api/data/meteo/"),
  ])

  if (!stationRequest.ok || !synopRequest.ok || !meteoRequest.ok) throw Error("Request failed")
  const [stationData, synopData, meteoData] = await Promise.all([stationRequest.json(), synopRequest.json(), meteoRequest.json()])
  const stationMap = new Map(stationData.map((item) => [`${item["kod 9-znakowy"]}`, item]))
  const synopMap = new Map(synopData.map((item) => [Number(item.id_stacji?.slice(2)), item]))
  const stations = meteoData.map(station => {
    const stationDataItem = stationMap.get(station.kod_stacji)
    return {
      id: station.kod_stacji,
      wmoCode: stationDataItem ? `12${stationDataItem["kod stacji"]}` : "",
      isSynop: stationDataItem ? synopMap.has(stationDataItem["kod stacji"]) : false,
      name: station.nazwa_stacji,
      longitude: station.lon ? Number(station.lon) : null,
      latitude: station.lat ? Number(station.lat) : null,
      altitude: station.wysokosc_npm ? Number(station.wysokosc_npm) : null,
    }
  })
  writeFile("./src/data/imgw-stations.json", JSON.stringify(stations, null, 2))
  console.log("Stations data saved!")
} catch (e) {
  console.error(e)
}
