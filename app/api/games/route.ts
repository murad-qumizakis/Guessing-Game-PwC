import { NextRequest, NextResponse } from "next/server";

type Game = {
  id: number;
  name: string;
  randomNumber: number;
};

export async function GET(request: NextRequest) {
  try {
    const res = await fetch("http://localhost:3001/", {
      cache: "no-store",
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
    const res = await fetch("http://localhost:3001/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
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
    await fetch(`http://localhost:3001/game/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json({ message: "Game deleted" });
  } catch (e) {
    console.log(e);
  }
}
