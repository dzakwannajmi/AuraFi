import React from "react";
import useAuth from "../hooks/useAuth";

const Header = ({ greetText }) => {
  const { user, login, logout } = useAuth();

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl">Welcome to HopeBridge</h1>
        <p className="text-sm">{greetText}</p>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          {user ? (
            <>
              <li className="text-sm">
                Logged in as: <span className="font-medium">{user}</span>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-danger hover:bg-red-600 text-white rounded-xl shadow transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={login}
                className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-xl shadow transition"
              >
                Login with Internet Identity
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
