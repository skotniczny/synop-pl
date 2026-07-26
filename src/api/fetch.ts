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

export type MeteoRecord = {
  kod_stacji: string
  nazwa_stacji: string
  lon: string | null
  lat: string | null
  rok_zalozenia_stacji: string | null
  wysokosc_npm: string | null
  temperatura_gruntu: string | null
  temperatura_gruntu_data: string | null
  temperatura_powietrza: string | null
  temperatura_powietrza_data: string | null
  wiatr_kierunek: string | null
  wiatr_kierunek_data: string | null
  wiatr_srednia_predkosc: string | null
  wiatr_srednia_predkosc_data: string | null
  wiatr_predkosc_maksymalna: string | null
  wiatr_predkosc_maksymalna_data: string | null
  wilgotnosc_wzgledna: string | null
  wilgotnosc_wzgledna_data: string | null
  wiatr_poryw_10min: string | null
  wiatr_poryw_10min_data: string | null
  opad_10min: string | null
  opad_10min_data: string | null
}

async function fetchJson<T>(url: string): Promise<T[]> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Response status ${response.status}`)
  }
  return await response.json()
}

const baseUrl = "https://danepubliczne.imgw.pl/api/data"

export async function fetchImgwSynopData(): Promise<SynopRecord[]> {
  return fetchJson<SynopRecord>(`${baseUrl}/synop/`)
}

export async function fetchImgwMeteoData(): Promise<MeteoRecord[]> {
  return fetchJson<MeteoRecord>(`${baseUrl}/meteo/`)
}
