// src/hooks/useSound.js
export const useAudio = (url, volume = 0.5) => {
  const audio = new Audio(url);
  audio.volume = volume;

  const playSound = () => {
    // This is the "Magic" line: it resets the sound to the start 
    // so it can play again even if the first click hasn't finished.
    audio.currentTime = 0; 
    audio.play().catch((err) => console.log("Audio play blocked", err));
  };

  return playSound;
};