import {
  createContext,
  createSignal,
  useContext,
  ParentComponent,
  Accessor,
  Setter,
} from "solid-js";
import { MIN_H, MIN_W, tTeamsCnt, tWindowSize } from "../Utils/Util";

interface ContextProps {
  windowSize: Accessor<tWindowSize>;
  setWindowSize: Setter<tWindowSize>;
  teamCnt: Accessor<tTeamsCnt>;
  setTeamCnt: Setter<tTeamsCnt>;
  pause: Accessor<boolean>;
  setPause: Setter<boolean>;
}

// Create a context to hold ContextProps values
const GlobalContext = createContext<ContextProps | undefined>(undefined);

// WindowSizeProvider component to set up the context
export const GlobalDataProvider: ParentComponent = (props) => {
  const [windowSize, setWindowSize] = createSignal<tWindowSize>({ width: MIN_W, height: MIN_H });
  const [teamCnt, setTeamCnt] = createSignal<tTeamsCnt>({ ROCK: 10, PAPER: 10, SCISSORS: 10 });

  const [pause, setPause] = createSignal(false);

  // Provide width and height values to the context
  return (
    <GlobalContext.Provider
      value={{
        windowSize,
        setWindowSize,
        teamCnt,
        setTeamCnt,
        pause,
        setPause,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

// Hook to access the window size context values
export function useGlobalData(): ContextProps {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useWindowSize must be used within a WindowSizeProvider");
  }
  return context;
}
