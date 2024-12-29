"use client"
import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState("Initial state");

  return (
    <GlobalContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
