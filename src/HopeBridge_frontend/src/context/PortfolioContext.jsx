import React, { createContext, useContext } from "react";
import usePortfolioData from "../hooks/usePortfolio";

const PortofolioContext = CreateContext(null);

export const PortofolioProvider = ({ Children }) => {
  const usePortofolio = usePortfolio();

  return (
    <PortofolioContext.Provider value={usePortofolio}>
      {Children}
    </PortofolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortofolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortofolioProvider");
  }
  return context;
};
