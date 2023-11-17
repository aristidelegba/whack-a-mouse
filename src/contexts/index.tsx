'use client'

import { TLevel, levels } from "@/configs";
import React, { createContext, useContext, ReactNode, useReducer, useMemo } from "react";

// Define your context type
type GlobalContextType = {
  score: number;
  levels: TLevel[];
  hidingDuration: number;
  visibilityDuration: number;
  showGoodByeScreen: boolean;
  selectedLevel: TLevel;
  setScore: React.Dispatch<number>;
  setVisibilityDuration: React.Dispatch<number>;
  setSelectedLevel: React.Dispatch<TLevel["id"]>;
  resetGame: React.Dispatch<Object>;
  setShowGoodByeScreen: React.Dispatch<boolean>;
}

// Define action types
type Action =
  | { type: "RESET_GAME"; payload: undefined }
  | { type: "SET_SCORE"; payload: number }
  | { type: "SET_VISIBILITY_DURATION"; payload: number }
  | { type: "SET_GOODBYE_SCREEN"; payload: boolean }
  | { type: "SET_SELECTED_LEVEL"; payload: TLevel };

// Create the context with an initial value
export const initialContextValue: GlobalContextType = {
  score: 0,
  levels: levels,
  hidingDuration: 2000,
  visibilityDuration: 1,
  selectedLevel: levels[0],
  showGoodByeScreen: false,
  setScore: () => { },
  setSelectedLevel: () => { },
  setVisibilityDuration: () => { },
  resetGame: () => { },
  setShowGoodByeScreen: () => { }
};

const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

// Create a custom hook for accessing the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};

// Create a reducer function
const globalReducer = (
  state: GlobalContextType,
  action: Action
): GlobalContextType => {
  switch (action.type) {
    case "SET_SCORE":
      return { ...state, score: state.score + action.payload };
    case "SET_VISIBILITY_DURATION":
      return { ...state, visibilityDuration: action.payload };
    case "SET_SELECTED_LEVEL":
      return { ...state, selectedLevel: action.payload };
    case "SET_GOODBYE_SCREEN":
      return { ...state, showGoodByeScreen: action.payload };
    case "RESET_GAME":
      return { ...initialContextValue };
    default:
      return state;
  }
};

// Create a context provider component using useReducer
type GlobalContextProviderProps = {
  children: ReactNode;
} & GlobalContextType


export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const setScore = (newScore: number) =>
    dispatch({ type: "SET_SCORE", payload: newScore });
  const setVisibilityDuration = (newDuration: number) =>
    dispatch({ type: "SET_VISIBILITY_DURATION", payload: newDuration });
  const setSelectedLevel = (newSelectedLevelId: TLevel["id"]) => {
    console.log("newSelectedLevelId :>> ", newSelectedLevelId);
    const payload = levels.find((l) => l.id === newSelectedLevelId);
    if (payload) {
      dispatch({ type: "SET_SELECTED_LEVEL", payload });
    }
  };
  const resetGame = () => {
    dispatch({ type: "RESET_GAME", payload: undefined });
  };
  const setShowGoodByeScreen = (newValue: boolean) => {
    dispatch({ type: "SET_GOODBYE_SCREEN", payload: newValue });
  };

  const [state, dispatch] = useReducer(globalReducer, {
    ...initialContextValue,
    setScore,
    setSelectedLevel,
    setVisibilityDuration,
    resetGame,
    setShowGoodByeScreen
  });

  const contextValue: GlobalContextType =
    useMemo(() => ({
      ...state
    }), [state]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
