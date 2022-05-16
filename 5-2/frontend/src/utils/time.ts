export function formatTimestamp(ts: number): string {
  const date = new Date(ts)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  return `${year}/${month}/${day} ${hour}:${minutes}`
}
