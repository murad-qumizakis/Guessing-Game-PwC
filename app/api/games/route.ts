import { NextRequest, NextResponse } from "next/server";

type Game = {
  id: number;
  name: string;
  randomNumber: number;
};

export async function GET(request: NextRequest) {
  try {
    const res = await fetch("https://guessing-game-api.azurewebsites.net/", {
      cache: "no-store",
      headers: {
        Authorization: process.env.GAME_SERVICE_API_KEY as string,
      },
    });

    const games: Game[] = await res.json();
    console.log("GAMES: ", games);
    return NextResponse.json(games);
  } catch (e) {
    console.log("HERE", e);
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json(); // Read the request body once
    const { name } = requestData;
    const res = await fetch(
      "https://guessing-game-api.azurewebsites.net/game",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.GAME_SERVICE_API_KEY as string,
        },
        body: JSON.stringify({ name }),
      }
    );
    const game: Game = await res.json();
    return NextResponse.json(game);
  } catch (e) {
    console.log(e);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: "No id provided" });
    }
    await fetch(`https://guessing-game-api.azurewebsites.net/game/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.GAME_SERVICE_API_KEY as string,
      },
    });
    return NextResponse.json({ message: "Game deleted" });
  } catch (e) {
    console.log(e);
  }
}
