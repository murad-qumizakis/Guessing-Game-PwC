"use client";
import { useState, useEffect } from "react";

interface Game {
  id: number;
  name: string;
  randomNumber: number;
}

export default function Page({ params }: { params: { id: string } }) {
  let [userGuess, setUserGuess] = useState<number>(0);
  let [guessResult, setGuessResult] = useState<string>("");
  let [countdown, setCountdown] = useState<number>(3);

  useEffect(() => {
    if (guessResult === "Correct") {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Redirect to home page after the countdown reaches 0
      if (countdown === 0) {
        clearInterval(timer);
        window.location.href = "/";
      }

      // delete the game with that id
      fetch("http://localhost:3000/api/games/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: +params.id,
        }),
      });

      return () => {
        clearInterval(timer);
      };
    }
  }, [guessResult, countdown]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/games/guess", {
        method: "POST",
        body: JSON.stringify({
          id: +params.id,
          guess: userGuess,
        }),
      });

      let result = await res.json();
      setGuessResult(result.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className=" max-w-lg mx-auto mt-20 shadow-2xl p-8 bg-slate-200 h-96">
        <button
          className="border border-gray-300 p-2 -mt-4 rounded bg-blue-500 text-white"
          onClick={() => (window.location.href = "/")}
        >
          Back
        </button>

        <h1 className="flex justify-center text-center text-2xl mt-6 ">
          Guess
        </h1>
        <div className="flex flex-col justify-center mt-7">
          <h3 className="flex justify-center text-center text-l ">
            The rules are simple: guess a number between 1 and 10,000.
          </h3>
          <section className="flex items-center flex-col mt-8 justify-center">
            <form
              className="flex flex-row items-center ml-10"
              onSubmit={handleSubmit}
            >
              <label className="flex flex-row gap-5 items-center">
                <input
                  className="appearance-none bg-gray-100 border border-gray-300 rounded p-2 mt-1"
                  type="number"
                  name="game"
                  placeholder="Enter your guess..."
                  maxLength={10}
                  value={userGuess || ""}
                  onChange={(event) => setUserGuess(+event.target.value)}
                />
                <button
                  className="border border-gray-300 p-2 mt-1 rounded bg-green-500 text-white"
                  type="submit"
                >
                  Guess
                </button>
              </label>
            </form>
            <span className="flex justify-center items-center mt-6">
              {guessResult === "Correct" && (
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-green-500 text-2xl">{guessResult}</h1>
                  <h1 className="text-black-500 text-lg">
                    Redirecting to home page in {countdown} seconds...
                  </h1>
                </div>
              )}

              {guessResult === "Too high" && (
                <h1 className="text-red-500 text-2xl">{guessResult}</h1>
              )}

              {guessResult === "Too low" && (
                <h1 className="text-red-500 text-2xl">{guessResult}</h1>
              )}
            </span>
          </section>
        </div>
      </div>
    </div>
  );
}
