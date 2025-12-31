"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type StoryModeContextType = {
  isStoryMode: boolean;
  toggleStoryMode: () => void;
  setStoryMode: (value: boolean) => void;
};

const StoryModeContext = createContext<StoryModeContextType | undefined>(
  undefined
);

export function StoryModeProvider({ children }: { children: ReactNode }) {
  const [isStoryMode, setIsStoryMode] = useState(false);

  const toggleStoryMode = () => setIsStoryMode((v) => !v);

  const setStoryMode = (value: boolean) => setIsStoryMode(value);

  return (
    <StoryModeContext.Provider
      value={{ isStoryMode, toggleStoryMode, setStoryMode }}
    >
      {children}
    </StoryModeContext.Provider>
  );
}

export function useStoryMode() {
  const ctx = useContext(StoryModeContext);
  if (!ctx) throw new Error("useStoryMode must be used within StoryModeProvider");
  return ctx;
}
