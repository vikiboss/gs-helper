import { useState } from 'react';

function useApi<T = any>(fetchApi: (...args: any[]) => Promise<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>('');

  async function request(...args: any[]): Promise<boolean> {
    setLoading(true);
    setError(null);

    let isOK = false;

    try {
      const resonse = await fetchApi(...args);

      console.log('useApi:', resonse);

      if (resonse) {
        isOK = true;
        setData(resonse);
      }
    } catch (e) {
      const isOffline = e?.message?.includes('getaddrinfo');
      const msg = isOffline ? '网络状况不佳，请检查后重试 T_T' : '加载超时，请检查网络连接 T_T';
      setError(msg);
    }

    setDone(true);
    setLoading(false);
    return isOK;
  }

  return [request, data, loading, error, done] as const;
}

export default useApi;
