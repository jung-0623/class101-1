import { useSearchParams } from "react-router-dom"

export default function useNumberParams(name: string, def = -1): number {
  const [searchParams] = useSearchParams()
  const param = searchParams.get(name)
  if (param === null) {
    return def
  }

  return parseInt(param, 10)
}
