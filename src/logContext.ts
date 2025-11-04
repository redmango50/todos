import { createContext } from "react";

interface LogContextType {
  log: string | undefined;
  setLog: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const logContext = createContext<LogContextType | undefined>(undefined);