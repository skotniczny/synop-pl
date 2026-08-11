export function makeSynopISOString(date: string, time: string): string {
  return `${date}T${time.padStart(2, "0")}:00:00.000Z`
}

export function makeMeteoISOString(timestamp: string): string {
  return `${timestamp.replace(" ", "T")}.000Z`
}
