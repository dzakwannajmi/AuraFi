import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import useAuth from "../hooks/useAuth"; // Assuming this hook is correctly implemented

const Header = ({ user, login, logout, isScrolled }) => {
  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 flex items-center py-5 px-10 border-b border-gray-border
        transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? "bg-gradient-to-r from-green-secondary to-black-primary shadow-lg"
            : "bg-black-primary"
        }
      `}
    >
      <div className="flex items-center mr-auto">
        <i className="fas fa-heartbeat text-green-primary text-3xl mr-2"></i> {/* Font Awesome Heartbeat Icon */}
        <h1 className="text-2xl font-bold gradient-text">AuraFi</h1>
      </div>

      {/* Main Navigation (Desktop) */}
      <nav className="hidden lg:flex items-center justify-center flex-1 space-x-12">
        <Link
          to="/"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
          preventScrollReset={true}
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
          preventScrollReset={true}
        >
          Dashboard
        </Link>
        <Link
          to="/transactions"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
          preventScrollReset={true}
        >
          Transactions
        </Link>
        <Link
          to="/ai-care"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
          preventScrollReset={true}
        >
          AI Care
        </Link>
        <Link
          to="/data-input"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
          preventScrollReset={true}
        >
          Data Input
        </Link>
        <Link
          to="/portfolio"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
          preventScrollReset={true}
        >
          Portfolio
        </Link>
        <Link
          to="/about"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
          preventScrollReset={true}
        >
          About
        </Link>
      </nav>
      <div className="flex items-center space-x-4 ml-auto">
        {user ? (
          <>
            <p className="text-gray-300 text-sm hidden md:block">
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
              Connect Wallet
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;