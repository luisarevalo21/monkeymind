import { createContext } from "react";

export const WorkContext = createContext({
  currentSession: null,
  currentTask: null,
  taskData: null,
});
