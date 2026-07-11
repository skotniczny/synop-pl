export type SynopRecord = {
  id_stacji: string
  stacja: string
  data_pomiaru: string
  godzina_pomiaru: string
  temperatura: string
  predkosc_wiatru: string
  kierunek_wiatru: string
  wilgotnosc_wzgledna: string
  suma_opadu: string
  cisnienie: string
}

export async function fetchImgwSynopData(): Promise<SynopRecord[]> {
  const url = "https://danepubliczne.imgw.pl/api/data/synop/"
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Response status ${response.status}`)
  }
  return await response.json()
}
