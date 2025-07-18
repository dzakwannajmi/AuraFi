import React from "react";

function TransactionsPage({ transactions }) {
  return (
    <>
      {/* Transaction Form */}
      <section className="p-10 max-w-2xl mx-auto mb-10 bg-gray-card-bg rounded-xl shadow-md border border-gray-border md:p-5 md:mx-5">
        <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
          Tambah Transaksi Baru
        </h2>
        <form>
          <div className="mb-5">
            <label
              htmlFor="type"
              className="block mb-2 font-medium text-gray-text-tertiary"
            >
              Jenis Transaksi
            </label>
            <select
              id="type"
              className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
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
              placeholder="e.g., 500000"
              className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
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
              placeholder="e.g., Obat-obatan, Dokter Gigi, Rawat Inap"
              className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
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
              placeholder="Deskripsi singkat transaksi"
              className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30 min-h-[80px] resize-y"
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
              className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
          >
            Tambah Transaksi
          </button>
        </form>
      </section>

      {/* Transaction List */}
      <section className="p-10 max-w-4xl mx-auto md:p-5">
        <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
          Daftar Transaksi Kesehatan
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-border bg-gray-card-bg shadow-md">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-4 text-left border-b border-gray-border bg-gray-table-header font-semibold text-gray-100">
                  Tanggal
                </th>
                <th className="p-4 text-left border-b border-gray-border bg-gray-table-header font-semibold text-gray-100">
                  Jenis
                </th>
                <th className="p-4 text-left border-b border-gray-border bg-gray-table-header font-semibold text-gray-100">
                  Kategori
                </th>
                <th className="p-4 text-left border-b border-gray-border bg-gray-table-header font-semibold text-gray-100">
                  Deskripsi
                </th>
                <th className="p-4 text-left border-b border-gray-border bg-gray-table-header font-semibold text-gray-100">
                  Jumlah
                </th>
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
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
export default TransactionsPage;
