const mongoose = require("mongoose");

const PDFSchema = new mongoose.Schema(
  {
    pdf_id: {type: String, default: "PDFID"},
    pdf_link: String,
    date: { type: String, default: new Date().toDateString() },
  },
  { timestamps: true }
);

const PDFData = new mongoose.model("pdfdata", PDFSchema);

module.exports = PDFData;