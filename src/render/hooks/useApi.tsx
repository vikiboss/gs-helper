import { useState } from 'react';

function useApi<T = any>(fetchApi: (...args: any[]) => Promise<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>(null);

  async function request(...args: any[]): Promise<boolean> {
    setLoading(true);
    setError(null);

    let isOK = false;

    try {
      const data = await fetchApi(...args);

      console.log('useApi:', data);

      if (data) {
        isOK = true;
        setData(data);
      }
    } catch (e) {
      setError(e);
    }

    setLoading(false);
    return isOK;
  }

  return [request, loading, data, error] as const;
}

export default useApi;
