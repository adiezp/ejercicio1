import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { Character } from "../types/Character";

export const CharacterDetail = () => {
  const { id } = useParams(); // <-- Get ID from URL
  const navigate = useNavigate();

  const { data: character, error, isLoading } = useApi<Character>(
    id ? `https://rickandmortyapi.com/api/character/${id}` : undefined
  );

  if (isLoading) return <p className="text-center text-xl">Cargando...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!character) return <p className="text-center text-xl">No se encontró el personaje</p>;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md text-center m-4">
      <img
        src={character.image}
        alt={character.name}
        className="w-64 h-auto rounded-lg mx-auto"
      />
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to List
      </button>
      <h2 className="text-3xl font-bold">{character.name}</h2>
      <p className="mt-2 text-lg">
        {character.species} - {character.status}
      </p>
      <p className="mt-4">{character.gender}</p>
      <p className="mt-4">{character.origin.name}</p>
    </div>
  );
};
