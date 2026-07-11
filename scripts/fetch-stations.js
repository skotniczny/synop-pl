import { writeFile } from 'node:fs/promises'

try {
  const request = await fetch('https://klimat.imgw.pl/json/stacje.json')
  if (!request.ok) throw Error('Request failed')
  const data = await request.json()
  const stations = data
    .filter(station => station.show === 1 && (station["data_do"] === "" || station["data_do"] === station["data_do"]))
    .map(station => {
      return {
        id: `12${station["kod stacji"]}`,
        name: station["nazwa stacji"],
        longitude: parseFloat(station["longitude"].replace(",", ".")),
        latitude:  parseFloat(station["latitude"].replace(",", ".")),
        altitude: station["wysokość [m npm]"]
      }
  })
  await writeFile('./src/data/imgw-stations.json', JSON.stringify(stations, null, 2))
  console.log("Stations data saved!")
} catch (e) {
  console.error(e)
}

