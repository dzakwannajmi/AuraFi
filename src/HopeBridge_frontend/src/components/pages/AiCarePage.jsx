import React, { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function AiCarePage() {
  const {
    gajiBulanan, // Monthly Salary
    pendapatanPasif, // Passive Income
    calculatedTotalExpenses, // Total Medical Expenses
    calculatedTotalIncome, // Total Insurance Claims
    netBalance, // Net Health Balance
    netWorth, // Net Worth
    budget, // Monthly Budget
    savings, // Savings Amount
    retirementSavings, // Retirement Savings
    emergencyFund, // Emergency Fund
    debts, // Total Debts
    punyaAset, // Has Assets (boolean)
    vehicles, // Vehicle Value
    rumahValue, // House Value
    tanahValue, // Land Value
    bangunanValue, // Building Value
    aiCareInput,
    setAiCareInput,
    aiCareResponse, // AI's last response (might not be used directly with chatHistory)
    setAiCareResponse, // To update AI's last response
    aiCareLoading,
    setAiCareLoading,
    getAiFinancialAdvice, // Function to get AI advice
  } = useOutletContext();

  // State for chat history
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null); // For auto-scrolling to the bottom of chat

  // Function to scroll to the latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect to scroll whenever chatHistory changes
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Modified function to send message and manage chat history
  const handleSendMessage = async () => {
    if (!aiCareInput.trim()) return; // Don't send empty messages

    const userMessage = { type: "user", text: aiCareInput };
    setChatHistory((prev) => [...prev, userMessage]); // Add user's message to history
    setAiCareInput(""); // Clear input

    setAiCareLoading(true);
    // Add "AI is typing..." message
    const typingMessage = {
      type: "ai",
      text: "AI is typing...",
      loading: true,
    };
    setChatHistory((prev) => [...prev, typingMessage]);
    scrollToBottom(); // Scroll to typing message

    // Prepare financial snapshot for AI
    const currentFinancialSnapshot = `
      Monthly Income: Rp ${gajiBulanan.toLocaleString("id-ID")}
      Passive Income: Rp ${pendapatanPasif.toLocaleString("id-ID")}
      Total Medical Expenses: Rp ${calculatedTotalExpenses.toLocaleString(
        "id-ID"
      )}
      Total Insurance Claims: Rp ${calculatedTotalIncome.toLocaleString(
        "id-ID"
      )}
      Net Health Balance: Rp ${netBalance.toLocaleString("id-ID")}
      Net Worth: Rp ${netWorth.toLocaleString("id-ID")}
      Monthly Budget: Rp ${budget.toLocaleString("id-ID")}
      Savings Amount: Rp ${savings.toLocaleString("id-ID")}
      Retirement Savings: Rp ${retirementSavings.toLocaleString("id-ID")}
      Emergency Fund: Rp ${emergencyFund.toLocaleString("id-ID")}
      Total Debts: Rp ${debts.toLocaleString("id-ID")}
      ${
        punyaAset
          ? `Vehicle Value: Rp ${vehicles.toLocaleString(
              "id-ID"
            )}, House Value: Rp ${rumahValue.toLocaleString(
              "id-ID"
            )}, Land Value: Rp ${tanahValue.toLocaleString(
              "id-ID"
            )}, Building Value: Rp ${bangunanValue.toLocaleString("id-ID")}`
          : ""
      }
    `;

    // Call getAiFinancialAdvice function from context
    const aiResponseText = await getAiFinancialAdvice(
      aiCareInput,
      currentFinancialSnapshot
    );

    setAiCareLoading(false);
    // Remove "AI is typing..." message and replace with actual response
    setChatHistory((prev) =>
      prev.map((msg) =>
        msg.loading ? { ...msg, text: aiResponseText, loading: false } : msg
      )
    );
  };

  return (
    <section id="ai-care" className="p-10 max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
        AI Care: Your Personal Financial Consultant ✨
      </h2>
      <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border flex flex-col h-[600px]">
        {/* Chat History Display */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="text-center text-gray-text-secondary mt-10">
              Hello! I am your AI Financial Consultant. Ask me anything about
              your finances.
            </div>
          )}
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                  msg.type === "user"
                    ? "bg-green-secondary text-white-default"
                    : "bg-gray-dark text-white-default"
                }`}
              >
                {msg.text}
                {msg.loading && <span className="ml-2 animate-pulse">...</span>}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} /> {/* Element for auto-scroll */}
        </div>

        {/* Chat Input Area */}
        <div className="mt-4 flex items-center border-t border-gray-border pt-4">
          <textarea
            className="flex-1 p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30 min-h-[40px] max-h-[120px] resize-y mr-3"
            placeholder="Type your question here..."
            value={aiCareInput}
            onChange={(e) => setAiCareInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          ></textarea>
          <button
            onClick={handleSendMessage}
            disabled={aiCareLoading || !aiCareInput.trim()}
            className="px-6 py-3 rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {aiCareLoading ? (
              <i className="fas fa-spinner animate-spin"></i>
            ) : (
              <i className="fas fa-paper-plane"></i>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
export default AiCarePage;
