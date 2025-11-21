"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GuessGame() {
  const [target, setTarget] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    setTarget(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleGuess = () => {
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      setFeedback("Please enter a number between 1 and 100.");
      return;
    }
    setAttempts(attempts + 1);
    if (num === target) {
      setFeedback(`🎉 Correct! You guessed it in ${attempts + 1} attempts.`);
    } else if (num < target) {
      setFeedback("Too low! Try again.");
    } else {
      setFeedback("Too high! Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <h2 className="text-xl font-semibold">Number Guessing Game</h2>
      <p className="text-muted-foreground">
        Guess a number between 1 and 100. You have {attempts} attempts so far.
      </p>
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="w-32"
        />
        <Button onClick={handleGuess}>Guess</Button>
      </div>
      {feedback && <p className="text-center">{feedback}</p>}
    </div>
  );
}
