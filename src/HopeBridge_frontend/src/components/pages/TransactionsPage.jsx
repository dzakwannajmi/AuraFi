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

  const [editingId, setEditingId] = useState(null); // State untuk melacak ID transaksi yang sedang diedit
  const [message, setMessage] = useState({ text: "", type: "" }); // State untuk notifikasi

  // Fungsi untuk menampilkan pesan notifikasi
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
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
      showMessage("Harap isi semua kolom dengan nilai yang valid.", "error");
      return;
    }

    const parsedAmount = parseInt(formData.amount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      showMessage("Jumlah harus berupa angka positif.", "error");
      return;
    }

    if (editingId) {
      // Mode Edit
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? { ...formData, id: editingId, amount: parsedAmount }
            : t
        )
      );
      setEditingId(null); // Reset mode edit
      showMessage("Transaksi berhasil diperbarui!", "success");
    } else {
      // Mode Tambah Baru
      const newTransaction = {
        ...formData,
        id: Date.now(), // ID unik sederhana
        amount: parsedAmount,
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      showMessage("Transaksi berhasil ditambahkan!", "success");
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
      setEditingId(transactionId); // Set ID transaksi yang sedang diedit
    }
  };

  const handleDelete = (transactionId) => {
    // Konfirmasi sebelum menghapus (opsional, bisa diganti modal kustom)
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
      showMessage("Transaksi berhasil dihapus.", "info");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {" "}
      {/* Menggunakan max-w-6xl untuk layout 2 kolom */}
      <h1 className="text-4xl font-bold text-center mb-8 text-white-default">
        Manajemen Transaksi Kesehatan
      </h1>
      {/* Notifikasi Pesan */}
      {message.text && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white-default z-50 ${
            message.type === "success"
              ? "bg-green-primary"
              : message.type === "error"
              ? "bg-red-primary"
              : "bg-purple-recharts"
          }`}
        >
          {message.text}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {" "}
        {/* Layout 2 kolom */}
        {/* Form */}
        <section className="p-6 bg-gray-card-bg rounded-xl shadow-md border border-gray-border">
          <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
            {editingId ? "Edit Transaksi" : "Tambah Transaksi Baru"}
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
                className="input-field"
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
                className="input-field"
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
                className="input-field"
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
                className="input-field min-h-[80px] resize-y"
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
                className="input-field"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90"
            >
              {editingId ? "Simpan Perubahan" : "Tambah Transaksi"}
            </button>
          </form>
        </section>
        {/* List */}
        <section className="p-6 bg-gray-card-bg rounded-xl shadow-md border border-gray-border">
          <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
            Daftar Transaksi Kesehatan
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-border bg-gray-card-bg shadow-md">
            <table className="w-full border-collapse min-w-[700px]">
              {" "}
              {/* Increased min-width for new column */}
              <thead>
                <tr>
                  {[
                    "Tanggal",
                    "Jenis",
                    "Kategori",
                    "Deskripsi",
                    "Jumlah",
                    "Aksi",
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
                    className="hover:bg-gray-table-hover"
                  >
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
                    <td className="p-4 text-left border-b border-gray-border">
                      <button
                        onClick={() => handleEdit(transaction.id)}
                        className="btn-secondary text-green-primary hover:bg-green-secondary hover:text-black-primary mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="btn-secondary text-red-primary hover:bg-red-secondary hover:text-white-default"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-400">
                      {" "}
                      {/* Updated colspan */}
                      Belum ada transaksi.
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
