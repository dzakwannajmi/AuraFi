import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import useAuth from "../hooks/useAuth"; // Assuming this hook is correctly implemented
import { library } from "@fortawesome/fontawesome-svg-core"; // Import library
import { fas } from "@fortawesome/free-solid-svg-icons"; // Import solid icons (fas)
import { fab } from "@fortawesome/free-brands-svg-icons"; // Import brand icons (fab)
library.add(fas, fab); // Add solid and brand icons to the library

const Header = ({ user, login, logout, isScrolled }) => {
  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 flex items-center py-5 px-10 border-b border-gray-border
        transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? "bg-gradient-to-r from-green-secondary to-black-primary shadow-lg"
            : "header-normal-gradient"
        }
      `}
    >
      <div className="flex items-center mr-auto">
        <i className="fas fa-heartbeat text-green-primary text-3xl mr-2 animate-pulse-fast"></i>{" "}
        {/* Font Awesome Heartbeat Icon with faster pulse */}
        <h1 className="text-2xl font-bold gradient-text">AuraFi</h1>{" "}
        {/* 'gradient-text' class here ensures only the text has the moving gradient background */}
      </div>

      {/* Main Navigation (Desktop) */}
      <nav className="hidden lg:flex items-center justify-center flex-1 space-x-12">
        <Link
          to="/"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap header-nav-link"
          preventScrollReset={true}
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap header-nav-link"
          preventScrollReset={true}
        >
          Dashboard
        </Link>
        <Link
          to="/transactions"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap header-nav-link"
          preventScrollReset={true}
        >
          Transactions
        </Link>
        <Link
          to="/ai-care"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap header-nav-link"
          preventScrollReset={true}
        >
          AI Care
        </Link>
        <Link
          to="/data-input"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap header-nav-link"
          preventScrollReset={true}
        >
          Data Input
        </Link>
        <Link
          to="/portfolio"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap header-nav-link"
          preventScrollReset={true}
        >
          Portfolio
        </Link>
        <Link
          to="/about"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap header-nav-link"
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
              className="px-6 py-3 rounded-lg font-semibold text-white-default bg-red-primary shadow-lg hover:opacity-90 transition-colors flex items-center justify-center"
            >
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={login}
              className="px-6 py-3 rounded-lg font-semibold text-white-default bg-gray-700 shadow-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              <i className="fas fa-sign-in-alt mr-2"></i> Login
            </button>
            <button
              onClick={login}
              className="hidden lg:block px-6 py-3 rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md btn-gradient-hover flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center">
                <i className="fas fa-wallet mr-2"></i> Connect Wallet
              </span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
