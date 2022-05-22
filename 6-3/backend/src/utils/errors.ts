export function mustOne<T>(arr: unknown[], e: unknown): T {
  if (!arr[0]) {
    throw e
  }

  return arr[0] as T
}

export function mustLong(v: string, e: unknown, min = 2): string {
  v = v.trim()
  if (v.length < min) {
    throw e
  }

  return v
}
