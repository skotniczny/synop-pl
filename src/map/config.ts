import { temperatureColors } from "./palettes/temperature"
import { humidityColors } from "./palettes/humidity"
import { pressureColors } from "./palettes/pressure"
import { rainColors } from "./palettes/rain"
import { windSpeedColors } from "./palettes/wind"
import { type SynopRecord } from "../api/fetch"

export type LayerKey =
  "temperatura_format" | "cisnienie_format" | "wilgotnosc_wzgledna" | "predkosc_wiatru" | "suma_opadu"

export type SynopKey = "temperatura" | "cisnienie" | "wilgotnosc_wzgledna" | "predkosc_wiatru" | "suma_opadu"

type Config = {
  label: string
  filter: maplibregl.FilterSpecification | null
  color: unknown[]
  synopKey: SynopKey
  unit: string
}

export const configs: { [Key in LayerKey]: Config } = {
  temperatura_format: {
    label: "Temperatura powietrza",
    filter: ["all", ["!=", ["get", "temperatura_format"], null]],
    color: temperatureColors("temperatura_format"),
    synopKey: "temperatura",
    unit: " °C",
  },
  cisnienie_format: {
    label: "Ciśnienie atmosferyczne",
    filter: ["all", ["!=", ["get", "cisnienie_format"], null]],
    color: pressureColors("cisnienie_format"),
    synopKey: "cisnienie",
    unit: " hPa",
  },
  wilgotnosc_wzgledna: {
    label: "Wilgotność powietrza",
    filter: ["all", ["!=", ["get", "wilgotnosc_wzgledna"], null]],
    color: humidityColors("wilgotnosc_wzgledna"),
    synopKey: "wilgotnosc_wzgledna",
    unit: "%",
  },
  predkosc_wiatru: {
    label: "Kierunek i prędkość wiatru",
    filter: ["!=", ["get", "predkosc_wiatru"], null],
    color: windSpeedColors("predkosc_wiatru"),
    synopKey: "predkosc_wiatru",
    unit: " m/s",
  },
  suma_opadu: {
    label: "Suma opadu",
    filter: ["all", ["!=", ["get", "suma_opadu"], "0"], ["!=", ["get", "suma_opadu"], null]],
    color: rainColors("suma_opadu"),
    synopKey: "suma_opadu",
    unit: " mm",
  },
}

export const tableColumns: { data: keyof SynopRecord; title: string }[] = [
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
]
