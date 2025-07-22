import React from "react";

function AboutPage() {
  return (
    <section id="about" className="p-10 max-w-6xl mx-auto my-10">
      {" "}
      {/* Increased max-width for better layout */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text">
        About AuraFi DApps
      </h2>
      <div className="bg-gray-card-bg rounded-xl p-8 shadow-lg border border-gray-border flex flex-col lg:flex-row items-center gap-8">
        {/* Left Section: Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            AuraFi is an innovative Decentralized Application (DApp) designed to
            help you track and manage your financial health, specifically
            concerning medical expenses and income. We believe that a clear
            understanding of your finances is key to a healthier and stress-free
            life.
          </p>
          <p className="text-lg text-gray-300 mb-4 font-semibold">
            With AuraFi, you can:
          </p>
          <ul className="list-none text-left text-gray-300 mb-6 space-y-3">
            <li className="flex items-start">
              <span className="text-green-primary mr-3 text-xl">
                <i className="fas fa-check-circle"></i>
              </span>
              Track medical income and expenses in detail.
            </li>
            <li className="flex items-start">
              <span className="text-green-primary mr-3 text-xl">
                <i className="fas fa-chart-line"></i>
              </span>
              Analyze your net worth in real-time.
            </li>
            <li className="flex items-start">
              <span className="text-green-primary mr-3 text-xl">
                <i className="fas fa-chart-bar"></i>
              </span>
              Visualize your financial data with intuitive charts.
            </li>
            <li className="flex items-start">
              <span className="text-green-primary mr-3 text-xl">
                <i className="fas fa-robot"></i>
              </span>
              Receive personalized financial advice from our AI Care.
            </li>
            <li className="flex items-start">
              <span className="text-green-primary mr-3 text-xl">
                <i className="fas fa-bullseye"></i>
              </span>
              Set financial goals and monitor your progress.
            </li>
          </ul>
          <p className="text-lg text-gray-300 leading-relaxed">
            Our mission is to empower you to make smarter financial decisions
            and achieve financial stability for a brighter future.
          </p>
        </div>

        {/* Right Section: Placeholder Image/Graphic */}
        <div className="flex-1 flex justify-center items-center p-4">
          {/* Placeholder for an image or a more complex graphic */}
          <div className="w-full max-w-sm h-64 bg-gray-input-bg rounded-lg flex items-center justify-center border border-gray-border text-gray-medium text-center p-4">
            {/* You can replace this with an actual image or SVG related to finance/health */}
            <i className="fas fa-heartbeat text-6xl text-green-primary opacity-70"></i>
            {/* Or simply: Financial Health Graphic Placeholder */}
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutPage;
