export function mostFrequent<T>(arr: T[]): T {
  const counts = new Map<T, number>()
  let most: T | null = null
  let max = 0

  for (const value of arr) {
    const count = (counts.get(value) ?? 0) + 1
    counts.set(value, count)

    if (count > max) {
      max = count
      most = value
    }
  }
  if (!most) throw Error("Invalid array")
  return most
}
