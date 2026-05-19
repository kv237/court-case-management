const supabase = require("../config/supabase");



// =====================================
// CASE REPORT
// =====================================

const getCaseReport = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("cases")

      .select("*");

    if (error) {
      throw error;
    }

    const totalCases =
      data.length;

    const pendingCases =
      data.filter(
        item =>
          item.case_status === "Pending"
      ).length;

    const closedCases =
      data.filter(
        item =>
          item.case_status === "Closed"
      ).length;

    res.status(200).json({

      success: true,

      report: {
        totalCases,
        pendingCases,
        closedCases,
      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// =====================================
// HEARING REPORT
// =====================================

const getHearingReport = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("hearings")

      .select("*");

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      totalHearings:
        data.length,

      hearings: data,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// =====================================
// DOCUMENT REPORT
// =====================================

const getDocumentReport = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("documents")

      .select("*");

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      totalDocuments:
        data.length,

      documents: data,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



module.exports = {

  getCaseReport,

  getHearingReport,

  getDocumentReport,

};