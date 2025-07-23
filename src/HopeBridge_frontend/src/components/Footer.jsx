import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Footer = () => {
  return (
    <footer className="bg-black-primary text-gray-text-secondary py-10 px-4 border-t border-gray-border shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col items-center md:items-start space-y-8">
        {/* Top Row: Logo and Social Media */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          {/* Logo */}
          <Link
            to="/"
            className="text-5xl font-extrabold gradient-text block transition-transform duration-300 hover:scale-105"
          >
            AuraFi
          </Link>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-5 text-3xl">
            <a
              href="https://x.com" // Replace with your X/Twitter link
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:bg-green-primary hover:text-black-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              aria-label="Follow us on X"
            >
              <i className="fab fa-x-twitter"></i>
            </a>
            <a
              href="https://instagram.com" // Replace with your Instagram link
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:bg-green-primary hover:text-black-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              aria-label="Follow us on Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://github.com" // Replace with your GitHub link
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:bg-green-primary hover:text-black-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              aria-label="Check our GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:bg-green-primary hover:text-black-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              aria-label="Follow us on LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:bg-green-primary hover:text-black-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              aria-label="Follow us on Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>

        {/* Separator Line */}
        <hr className="w-full border-gray-border my-8" />

        {/* Bottom Row: Navigation and Copyright */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0 text-md">
          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3">
            <li>
              <Link
                to="/"
                className="text-gray-text-secondary hover:text-green-primary transition-colors duration-200 whitespace-nowrap font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-gray-text-secondary hover:text-green-primary transition-colors duration-200 whitespace-nowrap font-medium"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/transactions"
                className="text-gray-text-secondary hover:text-green-primary transition-colors duration-200 whitespace-nowrap font-medium"
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="text-gray-text-secondary hover:text-green-primary transition-colors duration-200 whitespace-nowrap font-medium"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/data-input"
                className="text-gray-text-secondary hover:text-green-primary transition-colors duration-200 whitespace-nowrap font-medium"
              >
                Data Input
              </Link>
            </li>
            <li>
              <Link
                to="/ai-care"
                className="text-gray-text-secondary hover:text-green-primary transition-colors duration-200 whitespace-nowrap font-medium"
              >
                AI Care
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-text-secondary hover:text-green-primary transition-colors duration-200 whitespace-nowrap font-medium"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="text-gray-text-secondary hover:text-green-primary transition-colors duration-200 whitespace-nowrap font-medium"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="text-gray-text-secondary hover:text-green-primary transition-colors duration-200 whitespace-nowrap font-medium"
              >
                Terms of Service
              </Link>
            </li>
          </ul>

          {/* Copyright */}
          <p className="text-center md:text-right whitespace-nowrap mt-4 md:mt-0 text-gray-500">
            &copy; {new Date().getFullYear()} AuraFi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
