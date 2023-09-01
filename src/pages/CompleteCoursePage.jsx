// import { Link } from "react-router-dom";

// import ConfettiExplosion from "react-confetti-explosion";
// import jsPDF from "jspdf";
import { PDFDocument, rgb } from "pdf-lib";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const CompleteCoursePage = () => {



  const [modifiedPdfBytes, setModifiedPdfBytes] = useState(null);

  const handleDownloadCertificate = async () => {
    try {
      // Load the existing PDF file (replace with your PDF file path or URL)
      const existingPdfBytes = await fetch('http://localhost:5173/PDF/certificate.pdf').then((res) => res.arrayBuffer());

      // Create a new PDF document
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Create a new page with default dimensions
      const newPage = pdfDoc.getPages()[0];
      const { height } = newPage.getSize();

      // Add "Hello, World!" text to the new page
      // const helveticaFont = await pdfDoc.embedFont(PDFDocument.StandardFonts.Helvetica);
      newPage.drawText('Hello, World!', {
        x: 250,
        y: height / 2,
        size: 30,
        // font: helveticaFont,
        color: rgb(0, 0, 0), // Black color
        textAlign: 'center',
      });

      // Serialize the modified PDF document to bytes
      const modifiedPdfBytes = await pdfDoc.save();

      // Set the modified PDF bytes in the component state
      setModifiedPdfBytes(modifiedPdfBytes);
    } catch (error) {
      console.error('Error adding text to PDF:', error);
    }
  };

  return (
    <div className="payment-successful" style={{ "height": "43.2vh" }}>
      <h2>Course Completed Successfully</h2>
      <ConfettiExplosion style={{ "left": "50%", "translateX": "-50%" }} force={0.8} duration={5000} particleCount={1000} width={2000} />
      <p>
        You will receive your certificate in your email shortly.
      </p>
      <button onClick={handleDownloadCertificate} className="form__button ">Process Certificate</button>
      {modifiedPdfBytes && (
        <div className="mb-5 mt-5 text-center">
          <a
            className="form__button "
            href={`data:application/pdf;base64,${btoa(String.fromCharCode(...new Uint8Array(modifiedPdfBytes)))}`}
            download="modified.pdf"
          >
            Download Certificate
          </a>
        </div>
      )}
    </div>
  )
}

export default CompleteCoursePage