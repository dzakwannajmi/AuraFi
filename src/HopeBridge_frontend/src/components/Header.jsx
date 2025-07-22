import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import useAuth from "../hooks/useAuth";

const Header = ({ user, login, logout, isScrolled }) => {
  // isScrolled received from Layout.jsx
  // isScrolled state and useEffect for scroll removed from here

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
      <h1 className="text-2xl font-bold gradient-text mr-auto">AuraFi</h1>{" "}
      {/* mr-auto to push to the left */}
      {/* Main Navigation (Desktop) */}
      {/* Using flex-1 and justify-center to center navigation */}
      <nav className="hidden lg:flex items-center justify-center flex-1 space-x-12">
        {" "}
        {/* Increased space-x- and added flex-1, justify-center */}
        <Link
          to="/"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
        >
          Dashboard
        </Link>
        <Link
          to="/transactions"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
        >
          Transactions
        </Link>
        <Link
          to="/ai-care"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
        >
          AI Care
        </Link>
        <Link
          to="/data-input"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
        >
          Data Input
        </Link>
        <Link
          to="/portfolio"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
        >
          Portfolio
        </Link>
        <Link
          to="/about"
          className="text-gray-light hover:text-white-default transition-colors whitespace-nowrap"
        >
          About
        </Link>
      </nav>
      <div className="flex items-center space-x-4 ml-auto">
        {" "}
        {/* ml-auto to push to the right */}
        {user ? (
          <>
            <p className="text-gray-300 text-sm hidden md:block">
              {" "}
              {/* Hide on mobile */}
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
        {/* Hamburger icon for mobile navigation (if needed) - Removed because main navigation is in header */}
      </div>
    </header>
  );
};

export default Header;
