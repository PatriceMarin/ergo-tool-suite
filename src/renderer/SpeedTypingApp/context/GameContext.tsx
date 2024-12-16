import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Définir les types pour l'état et les actions
export interface GameState {
  level: string;
  words: string[];
  currentWord: string;
  typingWord: string;
  matchedWord: string;
  score: number;
  health: number;
  currentState: string;
  speed: number;
  typingError: boolean | null;
}

type Action =
  | { type: 'SET_TYPING_WORD'; payload: string }
  | { type: 'SET_SPEED'; payload: number }
  | { type: 'SET_GAME'; payload: GameState }
  | { type: 'SET_RESTART'; payload: GameState }
  | { type: 'SET_TYPED_WORD'; payload: GameState };

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
  typingError: false,
};

function getCommonPrefixWithDifference(
  currentWord: string,
  typingWord: string,
) {
  let result = '';

  for (let i = 0; i < typingWord.length; i += 1) {
    if (currentWord[i].localeCompare(typingWord[i], 'fr-FR') === 0) {
      result += typingWord[i];
    }
  }

  return result;
}

// Créer un réducteur pour mettre à jour l'état
const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'SET_TYPING_WORD': {
      if (
        state.currentWord.startsWith(action.payload) ||
        action.payload === ''
      ) {
        return { ...state, typingWord: action.payload, typingError: false };
      }

      const diff = getCommonPrefixWithDifference(
        state.currentWord,
        action.payload,
      );
      return { ...state, typingWord: diff, typingError: true };
    }
    case 'SET_SPEED':
      return { ...state, speed: action.payload };
    case 'SET_GAME': {
      return { ...state, ...action.payload };
    }
    case 'SET_RESTART':
      return initialState;
    case 'SET_TYPED_WORD': {
      if (action.payload.health <= 0) {
        return { ...state, ...action.payload, currentState: 'game-over' };
      }

      if (action.payload.words.length === 0) {
        return { ...state, ...action.payload, currentState: 'you-win' };
      }

      return { ...state, ...action.payload };
    }
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
