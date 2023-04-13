// part of inspiration comes from https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useRequest/src/useRequest.ts

import { useState } from 'react'

export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>

function useApi<TData = any, TParams extends any[] = []>(
  service: Service<TData, TParams>,
  options = { clear: true }
) {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<TData | undefined>()
  const [error, setError] = useState<string>('')

  async function run(...args: TParams) {
    setLoading(true)
    setError('')

    try {
      const res = await service(...args)

      console.log('useApi: ', res)

      if (res) {
        setData(res)
      } else {
        if (options.clear) {
          setData(undefined)
        }
      }

      setLoading(false)

      return res
    } catch (e) {
      const isOffline = e?.message?.includes('getaddrinfo')
      const msg = isOffline ? '网络状况不佳，请检查后重试 T_T' : '加载超时，请检查网络连接 T_T'

      setError(msg)
      setLoading(false)

      return false
    }
  }

  return { run, r: run, data, d: data, error, e: error, loading, l: loading } as const
}

export default useApi
