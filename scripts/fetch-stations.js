import { writeFile } from "node:fs/promises"

try {
  const [stationRequest, synopRequest] = await Promise.all([
    fetch("https://klimat.imgw.pl/json/stacje.json"),
    fetch("https://danepubliczne.imgw.pl/api/data/synop/"),
  ])

  if (!stationRequest.ok || !synopRequest.ok) throw Error("Request failed")
  const [stationData, synopData] = await Promise.all([stationRequest.json(), synopRequest.json()])
  const synopMap = new Map(synopData.map((item) => [Number(item.id_stacji?.slice(2)), item]))
  const stations = stationData
    .filter((station) => synopMap.has(station["kod stacji"]) &&
      station.show === 1 && (station["data_do"] === "" || station["data_do"] === station["data_od"]))
    .map((station) => {
      const synopStation = synopMap.get(station["kod stacji"])
      return {
        id: `12${station["kod stacji"]}`,
        station: synopStation.stacja,
        name: station["nazwa stacji"],
        longitude: Number(station["longitude"].replace(",", ".")),
        latitude: Number(station["latitude"].replace(",", ".")),
        altitude: station["wysokość [m npm]"],
      }
    })
  await writeFile("./src/data/imgw-stations.json", JSON.stringify(stations, null, 2))
  console.log("Stations data saved!")
} catch (e) {
  console.error(e)
}
