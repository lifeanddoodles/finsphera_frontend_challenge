import { useEffect, useMemo, useState } from "react";

/**
 * Fetches data from the specified URL and provides state management for the fetched data.
 *
 * @template T The type of data to be fetched.
 * @param {string} url - The URL to fetch data from.
 * @return {{ data: T | null, setData: React.Dispatch<React.SetStateAction<T | null>>, loading: boolean, error: string | null }} - An object containing the fetched data, a function to update the data, a boolean indicating if the data is currently being loaded, and any error that occurred during the fetch.
 */
const useFetch = <T>(
  url: string
): {
  data: T | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  loading: boolean;
  error: string | null;
} => {
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
