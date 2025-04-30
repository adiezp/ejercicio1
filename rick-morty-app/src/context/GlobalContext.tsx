import{
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Character } from "../types/Character";

type GlobalState = {
  characters: Character[] | null;
  selectedCharacter: Character | null;
};

type GlobalContextType = {
  globalState: GlobalState;
  updateGlobalState: <K extends keyof GlobalState>(key: K, value: GlobalState[K]) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    characters: null,
    selectedCharacter: null,
  });

  const updateGlobalState = useCallback(
    <K extends keyof GlobalState>(key: K, value: GlobalState[K]) => {
      setGlobalState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return (
    <GlobalContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
};
