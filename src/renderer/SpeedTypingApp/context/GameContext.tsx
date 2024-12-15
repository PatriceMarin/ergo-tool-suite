import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Définir les types pour l'état et les actions
interface GameState {
  level: string;
  words: string[];
  currentWord: string;
  typingWord: string;
  matchedWord: string;
  score: number;
  health: number;
  currentState: string;
  speed: number;
}

type Action =
  | { type: 'SET_LEVEL'; payload: string }
  | { type: 'SET_WORDS'; payload: string[] }
  | { type: 'SET_CURRENT_WORD'; payload: string }
  | { type: 'SET_TYPING_WORD'; payload: string }
  | { type: 'SET_MATCHED_WORD'; payload: string }
  | { type: 'SET_SCORE'; payload: number }
  | { type: 'SET_HEALTH'; payload: number }
  | { type: 'SET_CURRENT_STATE'; payload: string }
  | { type: 'SET_SPEED'; payload: number }
  | { type: 'SET_RESTART'; payload: GameState };

// Créer un état initial
export const initialState: GameState = {
  level: '',
  words: [],
  currentWord: '',
  typingWord: '',
  matchedWord: '',
  score: 0,
  health: 3,
  currentState: 'level',
  speed: 0.5,
};

// Créer un réducteur pour mettre à jour l'état
const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'SET_LEVEL':
      return { ...state, level: action.payload, words: [] }; // Always clear words when level changes
    case 'SET_WORDS': {
      const words = action.payload;

      if (words.length === 0) {
        return { ...state, words, currentState: 'you-win' };
      }

      return { ...state, words, currentWord: words[0] };
    }
    case 'SET_CURRENT_WORD':
      return { ...state, currentWord: action.payload };
    case 'SET_TYPING_WORD':
      return { ...state, typingWord: action.payload };
    case 'SET_MATCHED_WORD':
      return { ...state, matchedWord: action.payload };
    case 'SET_SCORE':
      return { ...state, score: action.payload };
    case 'SET_HEALTH': {
      if (action.payload <= 0) {
        return { ...state, health: action.payload, currentState: 'game-over' };
      }
      return { ...state, health: action.payload };
    }
    case 'SET_SPEED':
      return { ...state, speed: action.payload };
    case 'SET_CURRENT_STATE':
      return { ...state, currentState: action.payload };
    case 'SET_RESTART':
      return initialState;
    default:
      return state;
  }
};

// Créer des contextes pour l'état et le dispatch
const GameStateContext = createContext<GameState | undefined>(undefined);
const GameDispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined,
);

// Créer un fournisseur pour inclure le contexte autour de notre application
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

// Créer des hooks personnalisés pour utiliser le contexte plus facilement
export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
};

export const useGameDispatch = () => {
  const context = useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error('useGameDispatch must be used within a GameProvider');
  }
  return context;
};
