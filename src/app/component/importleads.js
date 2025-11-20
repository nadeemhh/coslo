import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../component/component-css/Importleads.css';
import { useState,useEffect } from 'react';

const Importleads = ({ filterurl }) => {

   const [inquiries, setinquiries] = useState([]);
     const [filetype, setfiletype] = useState('');
     

    const fetchleads = async (filetype) => {
      try {
         const token = localStorage.getItem('salestoken');
  
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sales/leads?${filterurl?`${filterurl}`:''}`, {
          method: 'GET',
           headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        }});
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
     
                setinquiries(data.data.leads);
                setfiletype(filetype)
      } catch (err) {
       console.log(err)
      } 

    };


  // -------------------- TABULAR PDF DOWNLOAD --------------------
  const downloadPDF = () => {
    if (!inquiries || inquiries.length === 0){
      alert('No leads found.')
      return;
    }

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
  if (!inquiries || inquiries.length === 0){
    alert('No leads found.')
     return;
    }

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


 useEffect(() => {
     
        if(filetype){

         if(filetype==='pdf'){
          downloadPDF()
          setfiletype('')
         }else{
          downloadCSV()
          setfiletype('')
         }

        }else{
          console.log('file type not found')
        }

      }, [filetype]);

  return (
    <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
      <button 
        className="downloadleads"
        onClick={()=>(fetchleads('pdf'))}
      >
        <i className="fas fa-file-pdf" style={{color:'#ff0000'}}></i> Download Pdf
      </button>

     <button 
        className="downloadleads"
        onClick={()=>(fetchleads('csv'))}
      >
        <i className="fas fa-file-excel" style={{color:'#00ff00'}}></i> Download csv
      </button>
    </div>
  );
};

export default Importleads;
