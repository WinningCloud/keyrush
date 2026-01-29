// src/utils/storage.js

export const saveTestResult = (result) => {
  // 1. Get existing history or empty array
  const existingHistory = JSON.parse(localStorage.getItem('keyrush_history') || '[]');
  
  // 2. Add new result to the start of the array
  const newHistory = [result, ...existingHistory];
  
  // 3. Save back to localStorage
  localStorage.setItem('keyrush_history', JSON.stringify(newHistory));
};

export const getHistory = () => {
  return JSON.parse(localStorage.getItem('keyrush_history') || '[]');
};

export const calculateGrade = (wpm, acc) => {
  if (wpm >= 90 && acc >= 98) return 'S';
  if (wpm >= 70 && acc >= 95) return 'A';
  if (wpm >= 50 && acc >= 90) return 'B';
  return 'C';
};