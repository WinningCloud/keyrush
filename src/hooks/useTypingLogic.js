import { useState, useEffect } from 'react';

export const useTypingLogic = (snippet) => {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);

  const resetTest = () => {
    setUserInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
  };

  useEffect(() => {
    // Start the timer on first keypress
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (userInput.length > 0 && startTime) {
      // Calculate Accuracy
      let correctChars = 0;
      const inputChars = userInput.split("");
      inputChars.forEach((char, index) => {
        if (char === snippet[index]) correctChars++;
      });
      setAccuracy(Math.floor((correctChars / userInput.length) * 100));

      // Calculate WPM
      const timeElapsedMinutes = (Date.now() - startTime) / 60000;
      if (timeElapsedMinutes > 0) {
        const calculatedWpm = Math.floor((userInput.length / 5) / timeElapsedMinutes);
        setWpm(calculatedWpm > 0 ? calculatedWpm : 0);
      }
    }

    // Check if finished
    if (userInput.length === snippet.length && snippet.length > 0) {
      setIsFinished(true);
    }
  }, [userInput, snippet, startTime]);

  return { userInput, setUserInput, wpm, accuracy, isFinished, resetTest };
};