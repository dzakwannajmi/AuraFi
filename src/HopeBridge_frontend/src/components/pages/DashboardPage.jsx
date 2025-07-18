import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { useOutletContext } from 'react-router-dom';

function DashboardPage() {
  const context = useOutletContext();

  // --- DEBUGGING: Log semua data yang diterima ---
  console.log("DashboardPage: Context received:", context);

  // Periksa apakah context atau propertinya undefined sebelum mendestrukturisasi
  if (!context || Object.keys(context).length === 0) {
    console.log("DashboardPage: Context kosong atau belum tersedia, menampilkan loading.");
    return (
      <div className="text-center text-gray-400 mt-20">
        Memuat data dashboard...
        <br/>
        Cek console browser Anda untuk detail lebih lanjut.
      </div>
    );
  }

  // Destrukturisasi semua prop yang dibutuhkan dari context
  const {
    totalExpenses, totalIncome, netBalance, netWorth, budget, savings, retirementSavings,
    vehicles, otherAssets, debts, emergencyFund, financialStatus, monthlyData, categoryExpenseData
  } = context;

  // Pastikan data penting yang akan digunakan di .toLocaleString() tidak undefined
  // Berikan nilai default 0 jika undefined, untuk mencegah crash
  const safeTotalExpenses = totalExpenses !== undefined ? totalExpenses : 0;
  const safeTotalIncome = totalIncome !== undefined ? totalIncome : 0;
  const safeNetBalance = netBalance !== undefined ? netBalance : 0;
  const safeNetWorth = netWorth !== undefined ? netWorth : 0; // Perbaikan: Cukup satu null check
  const safeBudget = budget !== undefined ? budget : 0;
  const safeSavings = savings !== undefined ? savings : 0;
  const safeRetirementSavings = retirementSavings !== undefined ? retirementSavings : 0;
  const safeEmergencyFund = emergencyFund !== undefined ? emergencyFund : 0;


  // Simple financial note based on current status
  const financialNote = financialStatus && financialStatus.level !== undefined // Tambahkan null/undefined check untuk level
    ? (financialStatus.level >= 4
      ? "Selamat! Kesehatan finansial Anda sangat baik. Terus pertahankan kebiasaan baik ini dan pertimbangkan untuk diversifikasi investasi."
      : financialStatus.level >= 2
      ? "Kesehatan finansial Anda stabil, namun ada ruang untuk perbaikan. Fokus pada pengurangan utang atau peningkatan dana darurat."
      : "Perlu perhatian lebih pada kesehatan finansial Anda. Mari kita mulai dengan membuat anggaran dan melacak pengeluaran Anda.")
    : "Memuat status keuangan..."; // Pesan default jika financialStatus belum siap


  // Tambahkan juga pemeriksaan untuk data grafik sebelum merender chart
  const isChartDataReady = monthlyData && monthlyData.length > 0 && categoryExpenseData && categoryExpenseData.length > 0;

  return (
    <section id="dashboard" className="max-w-6xl mx-auto my-10">
      <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">Ringkasan Dashboard Keuangan Kesehatan</h2>

      {/* Financial Level Indicator */}
      <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mb-8 text-center">
        <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">Level Keuangan Anda: <span className="gradient-text">Level {financialStatus ? financialStatus.level : 'N/A'}</span></h3>
        <p className="text-lg text-gray-300 mb-4">{financialStatus ? financialStatus.message : 'Memuat status keuangan...'}</p>
        <div className="flex justify-center items-center space-x-2">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                ${financialStatus && lvl <= financialStatus.level ? 'bg-gradient-to-r from-green-primary to-green-secondary text-white-default' : 'bg-gray-700 text-gray-400'}`}
            >
              {lvl}
            </div>
          ))}
        </div>
      </div>

      {/* Brief Financial Note */}
      <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mb-10 text-center">
        <h3 className="text-xl font-semibold text-gray-text-tertiary mb-3">Catatan Ringkas Kesehatan Finansial:</h3>
        <p className="text-lg text-gray-300">{financialNote}</p>
      </div>

      {/* Main Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">Total Pengeluaran Medis</h3>
          <p className="text-4xl font-bold gradient-text">Rp {safeTotalExpenses.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">Total Klaim Asuransi</h3>
          <p className="text-4xl font-bold gradient-text">Rp {safeTotalIncome.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">Saldo Bersih Kesehatan</h3>
          <p className="text-4xl font-bold gradient-text">Rp {safeNetBalance.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">Kekayaan Bersih (Net Worth)</h3>
          <p className="text-4xl font-bold gradient-text">Rp {safeNetWorth.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">Anggaran Bulanan</h3>
          <p className="text-4xl font-bold gradient-text">Rp {safeBudget.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">Dana Pensiun</h3>
          <p className="text-4xl font-bold gradient-text">Rp {safeRetirementSavings.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">Dana Darurat</h3>
          <p className="text-4xl font-bold gradient-text">Rp {safeEmergencyFund.toLocaleString('id-ID')}</p>
        </div>
      </div>

      {isChartDataReady ? (
        <>
          {/* Income vs Expense Line Chart */}
          <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10 mb-8">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">Tren Pemasukan & Pengeluaran Bulanan</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="gray-grid" />
                <XAxis dataKey="name" stroke="gray-medium" />
                <YAxis stroke="gray-medium" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'gray-tooltip-bg', border: '1px solid gray-tooltip-border', borderRadius: '8px' }}
                  itemStyle={{ color: 'white-default' }} // Menggunakan nama warna dari tailwind.config.js
                  labelStyle={{ color: 'gray-tooltip-label' }}
                  formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`}
                />
                <Legend wrapperStyle={{ color: 'gray-legend', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="Pemasukan" stroke="green-primary" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="Pengeluaran" stroke="red-primary" activeDot={{ r: 8 }} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category-wise Expense Bar Chart */}
          <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">Pengeluaran Berdasarkan Kategori</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={categoryExpenseData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="gray-grid" />
                <XAxis dataKey="name" stroke="gray-medium" />
                <YAxis stroke="gray-medium" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'gray-tooltip-bg', border: '1px solid gray-tooltip-border', borderRadius: '8px' }}
                  itemStyle={{ color: 'white-default' }} // Menggunakan nama warna dari tailwind.config.js
                  labelStyle={{ color: 'gray-tooltip-label' }}
                  formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`}
                />
                <Legend wrapperStyle={{ color: 'gray-legend', paddingTop: '10px' }} />
                <Bar dataKey="Pengeluaran" fill="red-primary" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          Grafik sedang dimuat atau data tidak cukup.
        </div>
      )}
    </section>
  );
}
export default DashboardPage;
