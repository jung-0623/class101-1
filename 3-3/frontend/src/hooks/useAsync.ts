import { useEffect, useState } from "react"

export default function useAsync<TArg, TReturn, TError>(f: (arg: TArg) => Promise<TReturn>, initArg?: TArg) {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<TReturn>()
  const [error, setError] = useState<TError>()

  const request = (arg: TArg) => {
    setLoading(true)
    setValue(undefined)
    setError(undefined)
    f(arg)
      .then((v) => {
        setValue(v)
        setLoading(false)
        setError(undefined)
      })
      .catch((e) => {
        setLoading(false)
        setError(e)
      })
  }

  useEffect(() => {
    if (initArg) {
      request(initArg)
    }
  }, [])

  return { request, loading, value, error }
}
