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
    const controller = new AbortController(); // <- Controlador
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));

        const response = await fetch(url, { signal }); // <- Se pasa signal
        if (!response.ok) throw new Error("Network error");

        const data = await response.json();
        setState({ data, error: null, isLoading: false });
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          console.log("🔁 fetch cancelado por desmontaje del componente");
        } else {
          const errorMessage = err instanceof Error ? err.message : "Unknown error";
          setState({ data: null, error: errorMessage, isLoading: false });
        }
      }
    };

    fetchData();

    return () => {
      controller.abort(); // <- Cancelación limpia al desmontar
    };
  }, [url]);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
  };
}
