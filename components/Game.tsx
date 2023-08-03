"use client";
import { useSession, signIn, signOut } from "next-auth/react";

type Game = {
  id: number;
  name: string;
  randomNumber: number;
};

interface GameProps {
  id?: number;
  gameName?: String;
  onDelete: () => void;
}

export default function Game(props: GameProps) {
  const { data: session } = useSession();
  console.log("SESSION: ", session);

  const handleJoinGame = () => {
    if (!session) {
      signIn();
    }
    window.location.href = `/game/${props.id}`;
  };

  const handleDeleteGame = () => {
    fetch("/api/games/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
      }),
    });
    props.onDelete();
  };

  return (
    <div>
      <div className="flex flex-row border-solid border rounded-md border-gray-950 shadow-lg justify-between">
        <main>
          <h1 className="flex justify-center text-center text-2xl p-3">
            {props.gameName}
          </h1>
        </main>

        <div className="flex flex-row justify-evenly m-2 gap-2">
          <button
            className="bg-green-500 text-white p-2 border-solid rounded-md"
            onClick={handleJoinGame}
          >
            Join
          </button>

          <button
            className="bg-red-500 text-white p-2 border-solid rounded-md"
            onClick={handleDeleteGame}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
