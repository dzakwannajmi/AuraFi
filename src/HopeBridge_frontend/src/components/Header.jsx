import React from "react";
import useAuth from "../hooks/useAuth";

// Pastikan setIsSidebarOpen diterima di sini
const Header = ({ greetText, isSidebarOpen, setIsSidebarOpen }) => {
  const { user, login, logout } = useAuth();

  return (
    <header className="flex justify-between items-center py-5 px-10 border-b border-gray-border bg-black-primary">
      <h1 className="text-2xl font-bold gradient-text">AuraFi</h1>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <p className="text-gray-300 text-sm">
              Logged in as:{" "}
              <span className="font-medium text-white-default">{user}</span>
            </p>
            <button
              onClick={logout}
              className="px-6 py-3 rounded-lg font-semibold text-white-default bg-red-primary shadow-lg hover:opacity-90 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={login}
              className="px-6 py-3 rounded-lg font-semibold text-white-default bg-gray-700 shadow-lg hover:bg-gray-600 transition-colors"
            >
              Login
            </button>
            <button
              onClick={login}
              className="hidden lg:block px-6 py-3 rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
            >
              Hubungkan Wallet
            </button>
          </>
        )}

        {/* Hamburger icon for mobile/tablet */}
        {/* Pastikan onClick memanggil setIsSidebarOpen yang diterima dari prop */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-green-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-primary"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
