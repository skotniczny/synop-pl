export function mostFrequent<T>(arr: T[]): T {
  if (!arr.length) throw Error("Invalid array")
  const counts = new Map<T, number>()
  let most = arr[0]
  let max = 0

  for (const value of arr) {
    const count = (counts.get(value) ?? 0) + 1
    counts.set(value, count)

    if (count > max) {
      max = count
      most = value
    }
  }
  return most
}
