import React from "react";
import { useFetch } from "../hooks/useFetch";
import { useGlobalContext } from "../context/GlobalContext";
import { Character } from "../types/Character";
import { useNavigate} from "react-router-dom";

export const CharacterList = () => {
  const { data, error, isLoading } = useFetch<{ results: Character[] }>(
    "https://rickandmortyapi.com/api/character"
  );
  const { globalState, updateGlobalState } = useGlobalContext();
  const navigate = useNavigate();

  // Almacenar los personajes en el contexto global cuando se obtienen
  React.useEffect(() => {
    if (data) {
      updateGlobalState("characters", data.results);
    }
  }, [data, updateGlobalState]);

  const characters = globalState.characters || [];

  if (isLoading) return <p className="text-center text-xl">Cargando...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
   
            <h1 className="text-3xl font-bold text-center py-6">
                Rick and Morty Characters
            </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {characters.map((character: Character) => (
            <div
            key={character.id}
            className="bg-white rounded-2xl shadow p-4 text-center cursor-pointer"
            onClick={() => {
                updateGlobalState("selectedCharacter", character);
                navigate(`/character/${character.id}`);
            }}
            >
            <img
                src={character.image}
                alt={character.name}
                className="w-full rounded-xl mb-2"
            />
            <h2 className="font-bold text-lg">{character.name}</h2>
            </div>
        ))}
        </div>
    </div>

  );
};
