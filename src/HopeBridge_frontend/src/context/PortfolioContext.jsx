import React, { createContext, useContext } from "react";
import usePortfolio from "../hooks/usePortfolio"; // Import custom hook usePortfolio

// Buat Context baru
const PortfolioContext = createContext(null);

// Provider untuk PortfolioContext
export const PortfolioProvider = ({ children }) => { // Perbaikan: 'children' lowercase
  // Panggil custom hook usePortfolio untuk mendapatkan data dan fungsi
  const portfolioData = usePortfolio(); // Perbaikan: gunakan nama hook yang benar

  return (
    <PortfolioContext.Provider value={portfolioData}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook untuk mengkonsumsi PortfolioContext
export const usePortfolioContext = () => { // Perbaikan: Ganti nama hook ini agar tidak konflik dengan usePortfolio dari hooks/
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolioContext must be used within a PortfolioProvider"); // Perbaikan pesan error
  }
  return context;
};
