import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import { HopeBridge_backend } from "declarations/HopeBridge_backend";
import { useEffect, useState } from "react";

export default function App() {
  const [greetText, setGreetText] = useState("");

  useEffect(() => {
    async function fetchGreeting() {
      const result = await HopeBridge_backend.greet("Najmi");
      setGreetText(result);
    }
    fetchGreeting();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout greetText={greetText} />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
