import React from "react";

function AboutPage() {
  return (
    <section id="about" className="p-10 max-w-4xl mx-auto my-10 text-center">
      <h2 className="text-3xl font-semibold mb-8 gradient-text">
        Tentang AuraFi DApps
      </h2>
      <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border">
        <p className="text-lg text-gray-300 mb-4">
          AuraFi adalah Decentralized Application (DApps) inovatif yang
          dirancang untuk membantu Anda melacak dan mengelola kesehatan
          finansial Anda, khususnya yang berkaitan dengan pengeluaran dan
          pemasukan medis. Kami percaya bahwa pemahaman yang jelas tentang
          keuangan adalah kunci untuk hidup yang lebih sehat dan bebas stres.
        </p>
        <p className="text-lg text-gray-300 mb-4">Dengan AuraFi, Anda dapat:</p>
        <ul className="list-disc list-inside text-left text-gray-300 mb-4 mx-auto max-w-md">
          <li>Melacak pemasukan dan pengeluaran kesehatan secara detail.</li>
          <li>
            Menganalisis kekayaan bersih (net worth) Anda secara real-time.
          </li>
          <li>
            Memvisualisasikan data keuangan Anda dengan grafik yang intuitif.
          </li>
          <li>
            Mendapatkan saran finansial yang dipersonalisasi dari AI Care kami.
          </li>
          <li>Mengatur tujuan keuangan dan memantau progresnya.</li>
        </ul>
        <p className="text-lg text-gray-300">
          Misi kami adalah memberdayakan Anda untuk membuat keputusan finansial
          yang lebih cerdas dan mencapai stabilitas keuangan untuk masa depan
          yang lebih cerah.
        </p>
      </div>
    </section>
  );
}
export default AboutPage;
