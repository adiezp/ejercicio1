import React, { createContext, useContext, useState, useCallback } from "react";

// Tipo genérico para cualquier dato que queramos gestionar en el contexto
type GlobalContextType = {
  [key: string]: any; // Guarda cualquier dato que queramos compartir
};

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [globalState, setGlobalState] = useState<GlobalContextType>({});

  const updateGlobalState = useCallback((key: string, value: any) => {
    setGlobalState((prev) => ({ ...prev, [key]: value }));
  }, []);
  

  return (
    <GlobalContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
};
