"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { usePathname } from "next/navigation";

type StoryModeContextType = {
  isStoryMode: boolean;
  toggleStoryMode: () => void;
  setStoryMode: (value: boolean) => void;
};

const StoryModeContext = createContext<StoryModeContextType | undefined>(
  undefined
);

export function StoryModeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isStoryModeState, setIsStoryModeState] = useState(false);

  const isStoryMode = pathname === "/story" || isStoryModeState;

  const toggleStoryMode = () => setIsStoryModeState((v) => !v);

  const setStoryMode = (value: boolean) => setIsStoryModeState(value);

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
