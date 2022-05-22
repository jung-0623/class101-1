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

export function mustString(v: unknown, e: unknown): string {
  if (typeof v !== "string") {
    throw e
  }
  return v
}

export function mustInt(v: any, e: unknown): number {
  const n = parseInt(v, 10)
  if (Number.isNaN(n)) {
    throw e
  }

  return n
}
