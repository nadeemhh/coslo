import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../component/component-css/Importleads.css';

const Importleads = ({ inquiries }) => {

  // -------------------- TABULAR PDF DOWNLOAD --------------------
  const downloadPDF = () => {
    if (!inquiries || inquiries.length === 0) return;

    const doc = new jsPDF();

    // Convert inquiries to rows for table
    const headers = [
      "Inquiry Date",
      "Buyer Name",
      "Phone",
      "Interested In",
      "Budget",
      "Location",
      "Assigned To",
      "Call Status",
      "Lead Status",
      
    ];

    const rows = inquiries.map((inq) => [
      inq.inquiry_date?.split("T")[0],
      inq.buyer_name,
      inq.phone_number,
      inq.interested_in,
      inq.budget,
      inq.location,
      inq.assigned_to,
      inq.call_status,
      inq.lead_status,
    ]);

    autoTable(doc, {
      head: [headers],
      body: rows,
      theme: "striped",
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [24, 144, 255] }
    });

    doc.save("inquiries.pdf");
  };



  // -------------------- CSV DOWNLOAD --------------------
const downloadCSV = () => {
  if (!inquiries || inquiries.length === 0) return;

  // Extract headers
    const headers = Object.keys(inquiries[0]).filter(key => key !== "_id");


  // Build CSV rows
  const rows = inquiries.map((inquiry) =>
    headers
      .map((key) => {
        let value = inquiry[key] ?? "";

        // ---- FIX: PHONE NUMBER / LARGE NUMBER ----
        if (typeof value === "string" && /^\d{8,}$/.test(value)) {
          value = `="${value}"`; // Prevent scientific notation
        }

        // Escape quotes
        value = String(value).replace(/"/g, '""');

        return `"${value}"`;
      })
      .join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");

  // Download CSV file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "inquiries.csv";
  link.click();
};


  return (
    <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
      <button 
        className="downloadleads"
        onClick={downloadPDF}
      >
        <i className="fas fa-file-pdf" style={{color:'#ff0000'}}></i> Download Pdf
      </button>

     <button 
        className="downloadleads"
        onClick={downloadCSV}
      >
        <i className="fas fa-file-excel" style={{color:'#00ff00'}}></i> Download csv
      </button>
    </div>
  );
};

export default Importleads;
