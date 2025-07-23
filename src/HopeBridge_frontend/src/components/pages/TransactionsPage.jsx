import React, { useState } from "react";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "expense",
      amount: 200000,
      category: "Medication",
      description: "Paracetamol and antibiotics",
      date: "2025-07-18",
    },
    {
      id: 2,
      type: "income",
      amount: 500000,
      category: "Insurance Claim",
      description: "Outpatient reimbursement",
      date: "2025-07-17",
    },
  ]);

  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null); // State to track the ID of the transaction being edited
  const [message, setMessage] = useState({ text: "", type: "" }); // State for notifications

  // Function to display notification messages
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000); // Message disappears after 3 seconds
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.amount ||
      !formData.category ||
      !formData.description ||
      !formData.date
    ) {
      showMessage("Please fill in all fields with valid values.", "error");
      return;
    }

    const parsedAmount = parseInt(formData.amount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      showMessage("Amount must be a positive number.", "error");
      return;
    }

    if (editingId) {
      // Edit Mode
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? { ...formData, id: editingId, amount: parsedAmount }
            : t
        )
      );
      setEditingId(null); // Reset edit mode
      showMessage("Transaction updated successfully!", "success");
    } else {
      // Add New Mode
      const newTransaction = {
        ...formData,
        id: Date.now(), // Simple unique ID
        amount: parsedAmount,
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      showMessage("Transaction added successfully!", "success");
    }

    // Reset form
    setFormData({
      type: "expense",
      amount: "",
      category: "",
      description: "",
      date: "",
    });
  };

  const handleEdit = (transactionId) => {
    const transactionToEdit = transactions.find((t) => t.id === transactionId);
    if (transactionToEdit) {
      setFormData({
        type: transactionToEdit.type,
        amount: transactionToEdit.amount.toString(), // Convert amount back to string for input field
        category: transactionToEdit.category,
        description: transactionToEdit.description,
        date: transactionToEdit.date,
      });
      setEditingId(transactionId); // Set ID of the transaction being edited
    }
  };

  const handleDelete = (transactionId) => {
    // Replaced window.confirm with a custom message/notification logic
    showMessage("Transaction deleted successfully.", "info"); // Show success message immediately
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
  };

  // Helper to format currency (Rp)
  const formatRpCurrency = (value) => {
    if (typeof value !== "number") return "0";
    return value.toLocaleString("id-ID");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 gradient-text animate-fade-in-up">
        {" "}
        {/* Applied gradient-text and animation */}
        Health Transaction Management
      </h1>
      {/* Message Notification */}
      {message.text && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white-default z-50 animate-fade-in-up ${
            /* Added animation */
            message.type === "success"
              ? "bg-green-primary"
              : message.type === "error"
              ? "bg-red-primary"
              : "bg-purple-recharts" // Assuming purple-recharts is a defined color in Tailwind config
          }`}
        >
          {message.text}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <section className="p-6 bg-gray-card-bg rounded-xl shadow-md border border-gray-border animate-fade-in-up animate-delay-100">
          {" "}
          {/* Added animation and delay */}
          <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
            {editingId ? "Edit Transaction" : "Add New Transaction"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="type"
                className="block mb-2 font-medium text-gray-text-tertiary"
              >
                Transaction Type
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={handleChange}
                className="input-field"
              >
                <option value="expense">Medical Expense</option>
                <option value="income">Insurance Claim</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="amount"
                className="block mb-2 font-medium text-gray-text-tertiary"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g., 500000"
                className="input-field"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="category"
                className="block mb-2 font-medium text-gray-text-tertiary"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Medication"
                className="input-field"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 font-medium text-gray-text-tertiary"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief transaction description"
                className="input-field min-h-[80px] resize-y"
              ></textarea>
            </div>
            <div className="mb-5">
              <label
                htmlFor="date"
                className="block mb-2 font-medium text-gray-text-tertiary"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-300" /* Added hover effects */
            >
              {editingId ? "Save Changes" : "Add Transaction"}
            </button>
          </form>
        </section>

        {/* Transaction List Section */}
        <section className="p-6 bg-gray-card-bg rounded-xl shadow-md border border-gray-border animate-fade-in-up animate-delay-200">
          {" "}
          {/* Added animation and delay */}
          <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
            Health Transaction List
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-border bg-gray-card-bg shadow-md">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr>
                  {[
                    "Date",
                    "Type",
                    "Category",
                    "Description",
                    "Amount",
                    "Actions",
                  ].map((text) => (
                    <th
                      key={text}
                      className="p-4 text-left border-b border-gray-border bg-gray-table-header font-semibold text-gray-light"
                    >
                      {text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-table-hover transition-colors" /* Added transition */
                  >
                    <td className="p-4 text-left border-b border-gray-border text-gray-300">
                      {transaction.date}
                    </td>
                    <td className="p-4 text-left border-b border-gray-border text-gray-300">
                      {transaction.type === "expense" ? "Expense" : "Income"}
                    </td>
                    <td className="p-4 text-left border-b border-gray-border text-gray-300">
                      {transaction.category}
                    </td>
                    <td className="p-4 text-left border-b border-gray-border text-gray-300">
                      {transaction.description}
                    </td>
                    <td className="p-4 text-left border-b border-gray-border">
                      {transaction.type === "expense" ? (
                        <span className="text-red-primary font-medium">
                          - Rp {formatRpCurrency(transaction.amount)}
                        </span>
                      ) : (
                        <span className="text-green-primary font-medium">
                          + Rp {formatRpCurrency(transaction.amount)}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-left border-b border-gray-border whitespace-nowrap">
                      {" "}
                      {/* Added whitespace-nowrap */}
                      <button
                        onClick={() => handleEdit(transaction.id)}
                        className="btn-secondary text-green-primary hover:bg-green-primary hover:text-black-primary mr-2 px-4 py-2" /* Adjusted hover, padding */
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="btn-secondary text-red-primary hover:bg-red-primary hover:text-white-default px-4 py-2" /* Adjusted hover, padding */
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-400">
                      No transactions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TransactionsPage;
