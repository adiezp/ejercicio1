import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));

        const response = await fetch(url);
        if (!response.ok) throw new Error("Network error");

        const data = await response.json();
        if (isMounted) {
          setState({ data, error: null, isLoading: false });
        }
      } catch (err: any) {
        if (isMounted) {
          setState({ data: null, error: err.message, isLoading: false });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
  };
}
