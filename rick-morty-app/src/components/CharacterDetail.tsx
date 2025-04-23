import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";


export const CharacterDetail: React.FC = () => {
  const { globalState } = useGlobalContext();
  const selectedCharacter = globalState.selectedCharacter;
  const navigate = useNavigate();


  if (!selectedCharacter) return <p className="text-center text-xl">Selecciona un personaje</p>;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md text-center m-4">
      <img
        src={selectedCharacter.image}
        alt={selectedCharacter.name}
        className="w-64 h-auto rounded-lg mx-auto"
      />
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        Volver a la lista
     </button>
      <h2 className="text-3xl font-bold">{selectedCharacter.name}</h2>
      <p className="mt-2 text-lg">{selectedCharacter.species} - {selectedCharacter.status}</p>
      <p className="mt-4">{selectedCharacter.gender}</p>
      <p className="mt-4">{selectedCharacter.origin.name}</p>
    </div>
  );
};
