import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/pages/Layout";
import HomePage from "./components/pages/Home";
import DashboardPage from "./components/pages/DashboardPage";
import TransactionsPage from "./components/pages/TransactionsPage";
import AiCarePage from "./components/pages/AiCarePage";
import DataInputPage from "./components/pages/DataInputPage";
import AboutPage from "./components/pages/AboutPage";
import PortfolioPage from "./components/pages/PortfolioPage";

import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="ai-care" element={<AiCarePage />} />
            <Route path="data-input" element={<DataInputPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
