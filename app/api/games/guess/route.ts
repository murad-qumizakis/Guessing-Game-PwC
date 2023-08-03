import { NextRequest, NextResponse } from "next/server";

interface Game {
  id: number;
  name: string;
  randomNumber: number;
}

export async function POST(request: NextRequest) {
  try {
    const { guess, id } = await request.json();
    console.log("Guess: ", guess);

    // // get all games
    const res = await fetch(`https://guessing-game-api.azurewebsites.net/`, {
      cache: "no-store",
      headers: {
        Authorization: process.env.GAME_SERVICE_API_KEY as string,
      },
    });
    const games = await res.json();
    console.log("Games: ", games);

    // find the game with that id in the games array
    const game = games.find((game: Game) => game.id === id);

    // compare the guess to the game's randomNumber
    const { number } = game;

    // check if the number is too high, too low, or correct
    if (guess > number) {
      return NextResponse.json({ message: "Too high" });
    } else if (guess < number) {
      return NextResponse.json({ message: "Too low" });
    } else {
      return NextResponse.json({ message: "Correct" });
    }
  } catch (e) {
    console.log("HERIO", e);
  }
}
