"use client";
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ correct import

const DownloadPDFReport = ({ data = [] }) => {
  const handleDownload = () => {
    const doc = new jsPDF();


    doc.setFontSize(18);
    doc.text("Transaction Report", 14, 20);

    const income = data
      .filter((xp) => xp.type === "INCOME")
      .reduce((sum, xp) => sum + xp.amount, 0);
    const expense = data
      .filter((xp) => xp.type === "EXPENSE")
      .reduce((sum, xp) => sum + xp.amount, 0);

    doc.setFontSize(12);
    doc.text(`Total Income: $${income}`, 14, 35);
    doc.text(`Total Expense: $${expense}`, 14, 45);

    const tableColumn = ["S.No", "id", "Title", "Amount", "Type", "Category", "Date"];
    const tableRows = data.map((item,index) => [
        index+1,
      item.id,
      item.title,
      `$${item.amount}`,
      item.type,
      item.category,
      new Date(item.createdAt).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 55,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185] }, 
      alternateRowStyles: { fillColor: [240, 240, 240] }, 
    });

    // Save PDF
    doc.save("transactions.pdf");
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Download PDF
    </button>
  );
};

export default DownloadPDFReport;
