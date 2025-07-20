import React, { useState } from "react";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "expense",
      amount: 200000,
      category: "Obat-obatan",
      description: "Paracetamol dan antibiotik",
      date: "2025-07-18",
    },
    {
      id: 2,
      type: "income",
      amount: 500000,
      category: "Klaim Asuransi",
      description: "Reimburse rawat jalan",
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
      alert("Harap isi semua field");
      return;
    }

    const newTransaction = {
      ...formData,
      id: Date.now(), // ID unik sederhana
      amount: parseInt(formData.amount, 10),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setFormData({
      type: "expense",
      amount: "",
      category: "",
      description: "",
      date: "",
    });
  };

  return (
    <>
      {/* Form */}
      <section className="p-10 max-w-2xl mx-auto mb-10 bg-gray-card-bg rounded-xl shadow-md border border-gray-border md:p-5 md:mx-5">
        <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
          Tambah Transaksi Baru
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="type"
              className="block mb-2 font-medium text-gray-text-tertiary"
            >
              Jenis Transaksi
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default"
            >
              <option value="expense">Pengeluaran Medis</option>
              <option value="income">Klaim Asuransi</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="amount"
              className="block mb-2 font-medium text-gray-text-tertiary"
            >
              Jumlah
            </label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g., 500000"
              className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-2 font-medium text-gray-text-tertiary"
            >
              Kategori
            </label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Obat-obatan"
              className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 font-medium text-gray-text-tertiary"
            >
              Deskripsi
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Deskripsi singkat transaksi"
              className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default min-h-[80px] resize-y"
            ></textarea>
          </div>
          <div className="mb-5">
            <label
              htmlFor="date"
              className="block mb-2 font-medium text-gray-text-tertiary"
            >
              Tanggal
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90"
          >
            Tambah Transaksi
          </button>
        </form>
      </section>

      {/* List */}
      <section className="p-10 max-w-4xl mx-auto md:p-5">
        <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
          Daftar Transaksi Kesehatan
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-border bg-gray-card-bg shadow-md">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                {["Tanggal", "Jenis", "Kategori", "Deskripsi", "Jumlah"].map(
                  (text) => (
                    <th
                      key={text}
                      className="p-4 text-left border-b border-gray-border bg-gray-table-header font-semibold text-gray-100"
                    >
                      {text}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-table-hover">
                  <td className="p-4 text-left border-b border-gray-border text-gray-300">
                    {transaction.date}
                  </td>
                  <td className="p-4 text-left border-b border-gray-border text-gray-300">
                    {transaction.type === "expense"
                      ? "Pengeluaran"
                      : "Pemasukan"}
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
                        - Rp {transaction.amount.toLocaleString("id-ID")}
                      </span>
                    ) : (
                      <span className="text-green-primary font-medium">
                        + Rp {transaction.amount.toLocaleString("id-ID")}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-400">
                    Belum ada transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default TransactionsPage;
