const PDFDocument =
require("pdfkit");

const supabase =
require("../config/supabase");



// =====================================
// EXPORT CASES PDF
// =====================================

const exportCasesPDF =
async (req, res) => {

  try {

    const { data, error } =
      await supabase

        .from("cases")

        .select("*");

    if (error) {
      throw error;
    }

    const doc =
      new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=cases-report.pdf"
    );

    doc.pipe(res);



    // TITLE

    doc
      .fontSize(20)
      .text(
        "Court Case Report",
        {
          align: "center",
        }
      );

    doc.moveDown();



    // CASE DATA

    data.forEach((item, index) => {

      doc
        .fontSize(12)
        .text(
          `${index + 1}. ${item.case_title}`
        );

      doc.text(
        `Case Number: ${item.case_number}`
      );

      doc.text(
        `Court: ${item.court_name}`
      );

      doc.text(
        `Status: ${item.case_status}`
      );

      doc.moveDown();

    });



    doc.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

module.exports = {

  exportCasesPDF,

};