import React, { useState } from "react";
// Don't forget to import Font Awesome library and specific icons
// if you are using them this way in other parts of your app.
// For this component, the `<i>` tag with classes relies on global FA CSS.

function OnboardingModal({ onClose }) {
  // State to track the current onboarding step
  const [currentStep, setCurrentStep] = useState(0);

  // Data for each onboarding step, all translated to English
  const onboardingSteps = [
    {
      title: "Welcome to AuraFi!",
      icon: "fas fa-hand-sparkles", // Example icon from Font Awesome Solid
      description:
        "AuraFi is your personal financial health companion. We're here to help you achieve financial peace of mind.",
      features: [
        {
          name: "Comprehensive Tracking",
          desc: "Record and manage all aspects of your finances.",
        },
        {
          name: "Intelligent Analysis",
          desc: "Gain deep insights into your spending patterns and assets.",
        },
      ],
    },
    {
      title: "Your Dashboard",
      icon: "fas fa-tachometer-alt", // Dashboard icon
      description:
        "The Dashboard is your control center. Here, you'll see an overview of your financial health.",
      features: [
        {
          name: "Financial Level",
          desc: "Understand your current financial standing.",
        },
        {
          name: "Key Metrics",
          desc: "View total income, expenses, net worth, and emergency fund.",
        },
        {
          name: "Visual Trends",
          desc: "Intuitive charts show your financial trends over time.",
        },
      ],
    },
    {
      title: "Data Input & AI Care",
      icon: "fas fa-clipboard-list", // Data input icon
      description:
        "Accurate data is key. Easily enter your financial information and get smart advice.",
      features: [
        {
          name: "Structured Input",
          desc: "Separate tabs for income, expenses, savings, investments, assets, and debts.",
        },
        {
          name: "Crypto Analysis",
          desc: "Simulate potential changes in your crypto investment value.",
        },
        {
          name: "Personalized AI Advice",
          desc: "Our AI Care feature is ready to provide tailored financial recommendations.",
        },
      ],
    },
    {
      title: "Ready to Start Your Journey?",
      icon: "fas fa-rocket", // Rocket icon for launch
      description:
        "AuraFi is designed to empower you. Let's embark towards better financial health!",
      features: [], // No specific features on the last step
    },
  ];

  const totalSteps = onboardingSteps.length;
  const currentStepData = onboardingSteps[currentStep];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose(); // Close the modal on the last step
    }
  };

  const handleSkip = () => {
    onClose(); // Close the modal if the user chooses to skip
  };

  return (
    <div className="fixed inset-0 bg-black-primary bg-opacity-90 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
      <div
        className="bg-gray-card-bg p-8 rounded-2xl shadow-2xl max-w-xl w-full mx-auto text-center
                   border border-gray-border relative
                   transform transition-all duration-500 ease-out scale-100 opacity-100 animate-slide-in"
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-green-primary text-3xl focus:outline-none transition-colors"
          onClick={handleSkip}
          aria-label="Skip onboarding"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center mb-6 px-4">
          {/* Dynamic Icon with Animation */}
          <i
            className={`${currentStepData.icon} text-7xl gradient-text mb-5 animate-bounce-once`}
          ></i>
          <h3 className="text-4xl font-extrabold gradient-text mb-4 leading-tight">
            {currentStepData.title}
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed max-w-md mx-auto">
            {currentStepData.description}
          </p>
        </div>

        {/* Features List (Conditional Render) */}
        {currentStepData.features.length > 0 && (
          <ul className="list-none text-left text-gray-300 space-y-3 mb-8 px-4 sm:px-8">
            {currentStepData.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <i className="fas fa-check-circle text-green-primary text-xl mr-3 mt-1"></i> {/* Feature check icon */}
                <div>
                  <span className="font-bold text-white-default text-xl">
                    {feature.name}:
                  </span>{" "}
                  <span className="text-lg text-gray-400">{feature.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Progress Indicator Dots */}
        <div className="flex justify-center items-center space-x-3 mb-8">
          {onboardingSteps.map((_, index) => (
            <span
              key={index}
              className={`block w-4 h-4 rounded-full transition-all duration-300 ease-in-out
                ${
                  index === currentStep
                    ? "bg-green-primary scale-125 shadow-md" // Active dot styles
                    : "bg-gray-700 hover:bg-gray-600 cursor-pointer" // Inactive dot styles
                }`}
              aria-label={`Go to step ${index + 1}`}
              onClick={() => setCurrentStep(index)} // Allow clicking dots to navigate
            ></span>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          {/* Skip Button (only on intermediate steps) */}
          {currentStep < totalSteps - 1 ? (
            <button
              onClick={handleSkip}
              className="px-6 py-3 text-lg rounded-full font-semibold text-gray-400
                         border border-gray-700 hover:bg-gray-800 transition-colors
                         shadow-md hover:shadow-lg"
            >
              Skip
            </button>
          ) : (
            <span className="w-1/4"></span> // Placeholder to keep "Get Started" centered
          )}

          {/* Next/Get Started Button */}
          <button
            onClick={handleNext}
            className="px-10 py-4 text-xl rounded-full font-bold text-white-default
                       bg-gradient-to-r from-green-primary to-green-secondary shadow-lg
                       hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl
                       active:translate-y-0 active:shadow-md transition-all duration-300"
          >
            {currentStep < totalSteps - 1 ? "Next" : "Get Started!"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingModal;