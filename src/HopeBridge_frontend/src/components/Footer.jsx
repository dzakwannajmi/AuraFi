import React from "react";
import { Link } from "react-router-dom"; // Import Link untuk navigasi

const Footer = () => {
  return (
    <footer className="bg-black-primary text-gray-text-secondary py-8 px-4 border-t border-gray-border">
      <div className="max-w-6xl mx-auto flex flex-col items-center md:items-start space-y-6">
        {/* Baris Atas: Logo dan Media Sosial */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
          {/* Logo */}
          <Link to="/" className="text-4xl font-bold gradient-text block">
            AuraFi
          </Link>

          {/* Media Sosial */}
          <div className="flex justify-center space-x-4 text-2xl">
            <a
              href="https://x.com" // Ganti dengan tautan X/Twitter Anda
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-primary transition-colors border border-gray-border rounded-full p-2 flex items-center justify-center w-10 h-10"
              aria-label="Follow us on X"
            >
              <i className="fab fa-x-twitter"></i>
            </a>
            <a
              href="https://instagram.com" // Ganti dengan tautan Instagram Anda
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-primary transition-colors border border-gray-border rounded-full p-2 flex items-center justify-center w-10 h-10"
              aria-label="Follow us on Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://github.com" // Ganti dengan tautan GitHub Anda
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-primary transition-colors border border-gray-border rounded-full p-2 flex items-center justify-center w-10 h-10"
              aria-label="Check our GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            {/* Tambahkan ikon media sosial lain jika diperlukan */}
            {/* Contoh: LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-primary transition-colors border border-gray-border rounded-full p-2 flex items-center justify-center w-10 h-10"
              aria-label="Follow us on LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            {/* Contoh: Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-primary transition-colors border border-gray-border rounded-full p-2 flex items-center justify-center w-10 h-10"
              aria-label="Follow us on Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>

        {/* Garis Pemisah */}
        <hr className="w-full border-gray-border my-6" />

        {/* Baris Bawah: Navigasi dan Copyright */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0 text-sm">
          {/* Navigasi */}
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-green-primary transition-colors whitespace-nowrap"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-green-primary transition-colors whitespace-nowrap"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/transactions"
                className="hover:text-green-primary transition-colors whitespace-nowrap"
              >
                Transaksi
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="hover:text-green-primary transition-colors whitespace-nowrap"
              >
                Portofolio
              </Link>
            </li>
            <li>
              <Link
                to="/data-input"
                className="hover:text-green-primary transition-colors whitespace-nowrap"
              >
                Data Input
              </Link>
            </li>
            <li>
              <Link
                to="/ai-care"
                className="hover:text-green-primary transition-colors whitespace-nowrap"
              >
                AI Care
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-green-primary transition-colors whitespace-nowrap"
              >
                About
              </Link>
            </li>
            {/* Tambahkan tautan lain jika diperlukan */}
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-green-primary transition-colors whitespace-nowrap"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="hover:text-green-primary transition-colors whitespace-nowrap"
              >
                Terms of Service
              </Link>
            </li>
          </ul>

          {/* Copyright */}
          <p className="text-center md:text-right whitespace-nowrap mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} HopeBridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
