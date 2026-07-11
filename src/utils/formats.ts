export const dateTimeFormatWeekday = new Intl.DateTimeFormat("pl-PL", {
  weekday: "long",
})

export const dateTimeFormatLong = new Intl.DateTimeFormat("pl-PL", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

export const dateTimeFormat = new Intl.DateTimeFormat("pl-PL", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

export const dateTimeFormatDate = new Intl.DateTimeFormat("pl-PL", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
})

export const dateTimeFormatTime = new Intl.DateTimeFormat("pl-PL", {
  hour: "2-digit",
  minute: "2-digit",
})
