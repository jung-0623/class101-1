import { createSearchParams, useNavigate } from "react-router-dom"

export default function useNavigateWithSearch(): (
  path: string,
  params: Record<string, unknown>,
  replace?: boolean,
) => void {
  const navigate = useNavigate()
  return (pathname, params, replace) => {
    const parsed: Record<string, string> = {}
    for (let p in params) {
      parsed[p] = `${params[p]}`
    }

    navigate({ pathname, search: createSearchParams(parsed).toString() }, { replace })
  }
}
