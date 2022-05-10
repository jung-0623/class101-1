import { useState } from "react"

export default function useAsync<TArg, TReturn, TError>(f: (arg: TArg) => Promise<TReturn>) {
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

  return { request, loading, value, error }
}
