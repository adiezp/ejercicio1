import { useEffect, useState } from "react";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type FetchState<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

export function useApi<T>(initialUrl?: string) {
  const [url, setUrl] = useState<string | null>(initialUrl ?? null);
  const [options, setOptions] = useState<RequestInit | null>(null);
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const response = await fetch(url, { ...options, signal });
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();
        setState({ data, error: null, isLoading: false });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setState({ data: null, error: errorMessage, isLoading: false });
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, options]);

  const request = <B = unknown>(reqUrl: string, method: Method = "GET", body?: B) => {
    setUrl(reqUrl);
    setOptions({
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
    request, 
  };
}
