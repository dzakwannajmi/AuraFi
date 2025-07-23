# `AuraFi`

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/ab41b5f1-635c-4e00-9b45-092a50dd5335" />

Welcome to AuraFi, your personal financial health companion built on the Internet Computer! This DApp (Decentralized Application) helps you track, analyze, and improve your financial well-being with smart insights and a secure, decentralized foundation.

By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To learn more before you start working with `HopeBridge`, see the following documentation available online:

* [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
* [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
* [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
* [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)

---

## 📦 Packages Used

AuraFi leverages a variety of powerful libraries and frameworks to deliver its features:

### Frontend

* **React**: For building the user interface.
* **Three.js**: For creating the engaging 3D floating icon animation on the homepage.
* **Recharts**: For rendering beautiful and interactive data visualizations (charts) on the Dashboard and Data Input pages.
* **React Router DOM**: For declarative navigation within the single-page application.
* **Tailwind CSS**: For rapid and utility-first styling of the application's UI.
* **Font Awesome**: For scalable vector icons used across the application (e.g., in the header and onboarding modal).
* **Custom SVG Icons**: Specific cryptocurrency icons are loaded as individual SVG files from the `public/Crypto/` folder for the Three.js animation on the homepage, offering high design flexibility.

### Backend

* **Motoko**: The native programming language for building smart contracts (canisters) on the Internet Computer.

---

## 🌐 Languages Used

* **Frontend**: **JavaScript (React)**
* **Backend**: **Motoko**

---

## 📁 Project Structure

The project follows a standard structure for Internet Computer DApps with a React frontend:

```
HopeBridge/
├── dfx.json
├── .env
├── .gitignore
├── LICENSE
├── mops.toml
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── declarations/                 # Auto-generated Candid interface declarations
│   ├── HopeBridge_backend.did
│   ├── HopeBridge_backend.js
│   ├── HopeBridge_frontend.did
│   └── HopeBridge_frontend.js
├── HopeBridge_backend/          # Motoko backend code
│   └── main.mo
├── HopeBridge_frontend/         # React frontend
│   ├── index.html
│   ├── vite-env.d.ts
│   ├── public/                  # Static files
│   │   └── Crypto/             # Custom SVGs for 3D animation
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── assets/             # For image/logo resources (optional)
│   │   ├── components/         # Reusable components
│   │   │   ├── investments/
│   │   │   │   ├── InvestmentForm.jsx
│   │   │   │   └── PortfolioList.jsx
│   │   │   ├── modals/
│   │   │   │   └── OnboardingModal.jsx
│   │   │   ├── utils/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Footer.jsx
│   │   ├── context/            # React Contexts
│   │   │   ├── AuthContext.jsx
│   │   │   ├── FinancialHealthContext.jsx
│   │   │   └── PortfolioContext.jsx
│   │   ├── hooks/              # Custom hooks
│   │   │   ├── useAuth.jsx
│   │   │   ├── useFinancialHealthData.jsx
│   │   │   └── usePortfolio.jsx
│   │   ├── pages/              # Main Pages
│   │   │   ├── AboutPage.jsx
│   │   │   ├── AICarePage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── DataInputPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── PortfolioPage.jsx
│   │   ├── services/           # Service API handlers
│   │   │   └── authService.js

```

---

## ✨ Features

AuraFi provides a comprehensive suite of features to empower your financial journey:

* **Interactive Homepage**: A dynamic and visually appealing landing page featuring a 3D animation with floating cryptocurrency icons, welcoming users to the platform.
* **Onboarding Tour**: A guided step-by-step introduction (`OnboardingModal`) for new users to quickly understand AuraFi's core functionalities and benefits.
* **Financial Data Input**: Dedicated sections (`DataInputPage`) to easily input your income, expenses, savings, investments, assets, and debts.
* **Cryptocurrency Analysis**: A specialized tool within Data Input to simulate potential gains or losses based on hypothetical price changes for your crypto holdings.
* **Personalized AI Care**: An AI-powered financial advisor (`AICarePage`) that provides tailored recommendations and insights based on your input financial data.
* **Comprehensive Dashboard**: A centralized view (`DashboardPage`) offering an overview of your financial health, including:

  * **Financial Level**: A simplified indicator of your financial standing.
  * **Key Metrics**: Total income, total expenses, net worth, emergency fund status, and debt overview.
  * **Visual Trends**: Intuitive charts and graphs (powered by Recharts) showcasing your financial patterns over time.
* **Transaction Management**: Track and manage your financial transactions.
* **Investment Portfolio**: View and manage your investment portfolio details.
* **User Authentication**: Secure login and logout functionality using Internet Identity.

---

## 🚀 Running the Project Locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

* Set `DFX_NETWORK` to `ic` if you are using Webpack
* Use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations

  * Setting `canisters -> {asset_canister_id} -> declarations -> env_override` to a string in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
* Write your own `createActor` constructor
