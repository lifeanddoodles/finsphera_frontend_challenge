import { useEffect, useMemo, useState } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return {
    data: useMemo(() => data, [data]),
    setData: useMemo(() => setData, [setData]),
    loading: useMemo(() => loading, [loading]),
    error: useMemo(() => error, [error]),
  };
};

export default useFetch;
