"use client";
import Game from "../components/Game";
import CreateGame from "@/components/CreateGame";
import { useState, useEffect } from "react";

type Game = {
  id: number;
  name: string;
  randomNumber: number;
};

export default function Home({ session }: any) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getGames() {
      const res = await fetch("/api/games/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.GAME_SERVICE_API_KEY as string,
          // fix cors issue
        },
      });
      const data = await res.json();
      setGames(data);
      setLoading(false);
    }
    getGames();
  }, []);

  return (
    <div>
      <div className=" max-w-lg mx-auto mt-10 shadow-2xl p-8 bg-slate-200 mb-10 overflow-auto">
        <h1 className="flex justify-center text-center text-2xl mt-10">
          Welcome to the guessing game!
        </h1>
        <div className="flex flex-col justify-center mt-7">
          <h3 className="flex justify-center text-center text-xl">
            Create new game
          </h3>
          <CreateGame setGame={setGames} session={session} />
        </div>
        <div className="flex flex-col justify-center overflow-auto">
          <section className="flex flex-col justify-center items-center mt-2">
            <h3 className="flex justify-center text-center text-xl mt-10">
              Play existing games
            </h3>

            <div className="flex flex-col justify-evenly gap-4 w-96 p-4">
              {loading && (
                <div className="flex items-center justify-center">
                  Loading existing games...
                </div>
              )}
              {games.length === 0 && !loading && (
                <div className="flex items-center justify-center">
                  No games found, create one!
                </div>
              )}
              {games.map((game: Game) => (
                <Game
                  key={game.id}
                  id={game.id}
                  gameName={game.name}
                  onDelete={() =>
                    setGames(games.filter((g) => g.id !== game.id))
                  }
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
