export function makeDateISOString(date: string, time: string): string {
  return `${date}T${time.padStart(2, "0")}:00:00.000Z`
}

export function createDate(isoString: string): Date {
  return new Date(isoString)
}
