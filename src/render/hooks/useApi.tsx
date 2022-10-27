import { useState } from "react";


function useApi<T = any>(fetchApi: (...args: any[]) => Promise<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>(null);

  async function request() {
    setLoading(true);
    try {
      const data = await fetchApi();
      setData(data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  return { request, loading, data, error } as const;
}

export default useApi;