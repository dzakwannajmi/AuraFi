import React, { createContext, useContext } from "react";
import useFinancialHealthData from "../hooks/useFinancialHealthData";

const FinancialHealthContext = createContext(null);

export const FinancialHealthProvider = ({ children }) => {
  const financialHealthData = useFinancialHealthData();

  return (
    <FinancialHealthContext.Provider value={financialHealthData}>
      {children}
    </FinancialHealthContext.Provider>
  );
};

export const useFinancialHealth = () => {
  const context = useContext(FinancialHealthContext);
  if (!context) {
    throw new Error(
      "useFinancialHealth must be used within a FinancialHealthProvider"
    );
  }
  return context;
};
