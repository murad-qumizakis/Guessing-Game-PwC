"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type Game = {
  id: number;
  name: string;
  randomNumber: number;
};

type SetGameProp = {
  setGame: React.Dispatch<React.SetStateAction<Game[]>>;
  session: any;
};

const CreateGame = ({ setGame, session }: SetGameProp) => {
  const [gameName, setGameName] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (gameName === "") return;

    // if the game name is longer than 13 characters, only use the first 13
    const gameNameLength = gameName.length;

    const response = await fetch("http://localhost:3000/api/games", {
      method: "POST",
      body: JSON.stringify({
        name: gameName.slice(0, 18),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const newGame = await response.json();
      setGame((prevGames) => [...prevGames, newGame]);
      setGameName("");
    }
  };

  return (
    <div>
      <section className="flex flex-start mt-8 justify-center">
        <form
          className="flex flex-row items-center ml-10"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-row gap-5 items-center">
            <input
              className="border border-gray-300 p-2 mt-1"
              type="text"
              name="newGameName"
              placeholder="Enter game name..."
              value={gameName}
              onChange={(event) => setGameName(event.target.value)}
            />
            {session ? (
              <button
                className="border border-gray-300 p-2 mt-1 rounded bg-blue-500 text-white"
                type="submit"
              >
                Create
              </button>
            ) : (
              <button
                className="border border-gray-300 p-2 mt-1 rounded bg-blue-500 text-white "
                onClick={() => signIn()}
              >
                Sign in to create game
              </button>
            )}
          </label>
        </form>
      </section>
    </div>
  );
};

export default CreateGame;
