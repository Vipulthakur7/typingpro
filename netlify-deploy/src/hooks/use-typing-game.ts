import { useState, useEffect, useCallback, useRef } from "react";

interface GameState {
  isActive: boolean;
  isPaused: boolean;
  startTime: number | null;
  timeElapsed: number;
  targetText: string;
  typedText: string;
  currentPosition: number;
  errors: number;
  totalKeystrokes: number;
  wpm: number;
  accuracy: number;
  cpm: number;
  progress: number;
}

interface UseTypingGameProps {
  initialText: string;
  onComplete?: (stats: {
    wpm: number;
    accuracy: number;
    timeSeconds: number;
    textLength: number;
    errors: number;
  }) => void;
  onKeyPress?: () => void;
}

export function useTypingGame({ initialText, onComplete, onKeyPress }: UseTypingGameProps) {
  const [gameState, setGameState] = useState<GameState>({
    isActive: false,
    isPaused: false,
    startTime: null,
    timeElapsed: 0,
    targetText: initialText,
    typedText: "",
    currentPosition: 0,
    errors: 0,
    totalKeystrokes: 0,
    wpm: 0,
    accuracy: 100,
    cpm: 0,
    progress: 0,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Calculate statistics
  const calculateStats = useCallback((state: GameState) => {
    const timeInMinutes = state.timeElapsed / 60;
    const correctChars = state.typedText.length - state.errors;
    const wordsTyped = correctChars / 5; // Standard: 5 characters = 1 word
    
    const wpm = timeInMinutes > 0 ? Math.round(wordsTyped / timeInMinutes) : 0;
    const accuracy = state.totalKeystrokes > 0 ? 
      Math.round((correctChars / state.totalKeystrokes) * 100) : 100;
    const cpm = timeInMinutes > 0 ? Math.round(correctChars / timeInMinutes) : 0;
    const progress = (state.typedText.length / state.targetText.length) * 100;

    return { wpm, accuracy, cpm, progress };
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState.isActive && !gameState.isPaused && gameState.startTime) {
      timerRef.current = setInterval(() => {
        setGameState(prev => {
          const newTimeElapsed = Math.floor((Date.now() - prev.startTime!) / 1000);
          const stats = calculateStats({ ...prev, timeElapsed: newTimeElapsed });
          return {
            ...prev,
            timeElapsed: newTimeElapsed,
            ...stats,
          };
        });
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState.isActive, gameState.isPaused, gameState.startTime, calculateStats]);

  const startGame = useCallback(() => {
    if (!gameState.isActive && !gameState.isPaused) {
      setGameState(prev => ({
        ...prev,
        isActive: true,
        startTime: Date.now(),
      }));
    }
  }, [gameState.isActive, gameState.isPaused]);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  const resetGame = useCallback((newText?: string) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setGameState({
      isActive: false,
      isPaused: false,
      startTime: null,
      timeElapsed: 0,
      targetText: newText || initialText,
      typedText: "",
      currentPosition: 0,
      errors: 0,
      totalKeystrokes: 0,
      wpm: 0,
      accuracy: 100,
      cpm: 0,
      progress: 0,
    });
    setIsComplete(false);
  }, [initialText]);

  const handleInput = useCallback((value: string) => {
    if (!gameState.isActive && !gameState.isPaused) {
      startGame();
    }

    if (gameState.isPaused) return;

    setGameState(prev => {
      // Prevent typing beyond the target text length
      if (value.length > prev.targetText.length) {
        return prev;
      }

      const newTypedText = value;
      const newTotalKeystrokes = prev.totalKeystrokes + Math.abs(newTypedText.length - prev.typedText.length);
      
      // Count errors
      let errors = 0;
      for (let i = 0; i < newTypedText.length; i++) {
        if (newTypedText[i] !== prev.targetText[i]) {
          errors++;
        }
      }

      const newState = {
        ...prev,
        typedText: newTypedText,
        totalKeystrokes: newTotalKeystrokes,
        errors,
        currentPosition: newTypedText.length,
      };

      const stats = calculateStats(newState);
      const updatedState = { ...newState, ...stats };

      // Check completion
      if (newTypedText.length === prev.targetText.length) {
        updatedState.isActive = false;
        setIsComplete(true);
        
        if (onComplete) {
          onComplete({
            wpm: stats.wpm,
            accuracy: stats.accuracy,
            timeSeconds: updatedState.timeElapsed,
            textLength: prev.targetText.length,
            errors,
          });
        }
      }

      return updatedState;
    });

    if (onKeyPress) {
      onKeyPress();
    }
  }, [gameState.isActive, gameState.isPaused, startGame, calculateStats, onComplete, onKeyPress]);

  // Generate highlighted text
  const highlightedText = gameState.targetText
    .split("")
    .map((char, index) => {
      if (index < gameState.typedText.length) {
        if (gameState.typedText[index] === char) {
          return `<span class="text-green-400 bg-green-400/20">${char}</span>`;
        } else {
          return `<span class="text-red-400 bg-red-400/20">${char}</span>`;
        }
      } else if (index === gameState.typedText.length) {
        return `<span class="bg-purple-400/30 text-white">${char}</span>`;
      } else {
        return `<span class="text-slate-300">${char}</span>`;
      }
    })
    .join("");

  return {
    gameState,
    startGame,
    resetGame,
    pauseGame,
    handleInput,
    highlightedText,
    isComplete,
  };
}
