import { fetchImgwMeteoData, fetchImgwSynopData, type MeteoRecord, type SynopRecord } from "../api/fetch"
import { meteoToGeoJSON } from "../data/meteoToGeoJson"
import { synopToGeoJSON } from "../data/synopToGeoJson"
import { meteoStations, synopStations, type Station } from "../data/imgw-stations"
import { meteoMeasurementTime, synopMeasurementTime } from "../data/measurementTime"
import { temperatureColors } from "./palettes/temperature"
import { humidityColors } from "./palettes/humidity"
import { pressureColors } from "./palettes/pressure"
import { rainColors } from "./palettes/rain"
import { windSpeedColors } from "./palettes/wind"

export type DataRecord = Record<string, string | null>

export type LayerConfig = {
  label: string
  filter: maplibregl.FilterSpecification | null
  color: unknown[]
  measurementKey: string
  unit: string
  showMin: boolean
}

export type TableColumn<T> = {
  data: keyof T
  title: string
}

const meteoTableColumns: TableColumn<MeteoRecord>[] = [
  { data: "kod_stacji", title: "Kod stacji" },
  { data: "nazwa_stacji", title: "Nazwa stacji" },
  { data: "temperatura_gruntu", title: "temp. gruntu [°C]" },
  { data: "temperatura_gruntu_data", title: "data [UTC]" },
  { data: "temperatura_powietrza", title: "temp. powietrza [°C]" },
  { data: "temperatura_powietrza_data", title: "data [UTC]" },
  { data: "wiatr_kierunek", title: "kier. wiatru [°]" },
  { data: "wiatr_kierunek_data", title: "data [UTC]" },
  { data: "wiatr_srednia_predkosc", title: "śr. prędkość wiatru [m/s]" },
  { data: "wiatr_srednia_predkosc_data", title: "data [UTC]" },
  { data: "wiatr_predkosc_maksymalna", title: "prędkość max. wiatru [m/s]" },
  { data: "wiatr_predkosc_maksymalna_data", title: "data [UTC]" },
  { data: "wilgotnosc_wzgledna", title: "wilgotność względna [%]" },
  { data: "wilgotnosc_wzgledna_data", title: "data [UTC]" },
  { data: "wiatr_poryw_10min", title: "poryw 10 min. [m/s]" },
  { data: "wiatr_poryw_10min_data", title: "data [UTC]" },
  { data: "opad_10min", title: "opad 10 min. [mm]" },
  { data: "opad_10min_data", title: "data [UTC]" },
]

const synopTableColumns: TableColumn<SynopRecord>[] = [
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

const meteoLayers: Record<string, LayerConfig> = {
  temperatura_format: {
    label: "Temperatura powietrza",
    filter: ["all", ["!=", ["get", "temperatura_format"], null]],
    color: temperatureColors("temperatura_format"),
    measurementKey: "temperatura_powietrza",
    unit: " °C",
    showMin: true,
  },
  temperatura_gruntu: {
    label: "Temperatura gruntu",
    filter: ["all", ["!=", ["get", "temperatura_gruntu"], null]],
    color: temperatureColors("temperatura_gruntu"),
    measurementKey: "temperatura_gruntu",
    unit: " °C",
    showMin: true,
  },
  wilgotnosc_wzgledna: {
    label: "Wilgotność powietrza",
    filter: ["all", ["!=", ["get", "wilgotnosc_wzgledna"], null]],
    color: humidityColors("wilgotnosc_wzgledna"),
    measurementKey: "wilgotnosc_wzgledna",
    unit: "%",
    showMin: true,
  },
  predkosc_wiatru: {
    label: "Średnia prędkość wiatru",
    filter: ["!=", ["get", "predkosc_wiatru"], null],
    color: windSpeedColors("predkosc_wiatru"),
    measurementKey: "wiatr_srednia_predkosc",
    unit: " m/s",
    showMin: false,
  },
  wiatr_predkosc_maksymalna: {
    label: "Maksymalna prędkość wiatru",
    filter: ["!=", ["get", "wiatr_predkosc_maksymalna"], null],
    color: windSpeedColors("wiatr_predkosc_maksymalna"),
    measurementKey: "wiatr_predkosc_maksymalna",
    unit: " m/s",
    showMin: false,
  },
  wiatr_poryw_10min: {
    label: "Poryw wiatru (10 min)",
    filter: ["!=", ["get", "wiatr_poryw_10min"], null],
    color: windSpeedColors("wiatr_poryw_10min"),
    measurementKey: "wiatr_poryw_10min",
    unit: " m/s",
    showMin: false,
  },
  suma_opadu: {
    label: "Suma opadu (10 min)",
    filter: ["all", ["!=", ["get", "suma_opadu"], "0"], ["!=", ["get", "suma_opadu"], null]],
    color: rainColors("suma_opadu"),
    measurementKey: "opad_10min",
    unit: " mm",
    showMin: false,
  },
}

const synopLayers: Record<string, LayerConfig> = {
  temperatura_format: {
    label: "Temperatura powietrza",
    filter: ["all", ["!=", ["get", "temperatura_format"], null]],
    color: temperatureColors("temperatura_format"),
    measurementKey: "temperatura",
    unit: " °C",
    showMin: true,
  },
  cisnienie_format: {
    label: "Ciśnienie atmosferyczne",
    filter: ["all", ["!=", ["get", "cisnienie_format"], null]],
    color: pressureColors("cisnienie_format"),
    measurementKey: "cisnienie",
    unit: " hPa",
    showMin: true,
  },
  wilgotnosc_wzgledna: {
    label: "Wilgotność powietrza",
    filter: ["all", ["!=", ["get", "wilgotnosc_wzgledna"], null]],
    color: humidityColors("wilgotnosc_wzgledna"),
    measurementKey: "wilgotnosc_wzgledna",
    unit: "%",
    showMin: true,
  },
  predkosc_wiatru: {
    label: "Kierunek i prędkość wiatru",
    filter: ["!=", ["get", "predkosc_wiatru"], null],
    color: windSpeedColors("predkosc_wiatru"),
    measurementKey: "predkosc_wiatru",
    unit: " m/s",
    showMin: false,
  },
  suma_opadu: {
    label: "Suma opadu",
    filter: ["all", ["!=", ["get", "suma_opadu"], "0"], ["!=", ["get", "suma_opadu"], null]],
    color: rainColors("suma_opadu"),
    measurementKey: "suma_opadu",
    unit: " mm",
    showMin: false,
  },
}

export type SourceConfig<T extends DataRecord = DataRecord> = {
  stationNameKey: string
  stations: Station[]
  layers: Record<string, LayerConfig>
  tableColumns: { data: string; title: string }[]
  fetchData(): Promise<T[]>
  toGeoJSON(data: T[]): maplibregl.GeoJSONSourceSpecification
  measurementTime(record: DataRecord, measurementKey: string): string | null
}

const meteoSourceConfig: SourceConfig<MeteoRecord> = {
  fetchData: fetchImgwMeteoData,
  toGeoJSON: meteoToGeoJSON,
  stationNameKey: "nazwa_stacji",
  stations: meteoStations,
  tableColumns: meteoTableColumns,
  layers: meteoLayers,
  measurementTime: meteoMeasurementTime,
}

const synopSourceConfig: SourceConfig<SynopRecord> = {
  fetchData: fetchImgwSynopData,
  toGeoJSON: synopToGeoJSON,
  stationNameKey: "stacja",
  stations: synopStations,
  tableColumns: synopTableColumns,
  layers: synopLayers,
  measurementTime: synopMeasurementTime,
}

export type SourceName = "meteo" | "synop"

export const sourceConfigs: Record<SourceName, SourceConfig> = {
  meteo: meteoSourceConfig,
  synop: synopSourceConfig,
}
