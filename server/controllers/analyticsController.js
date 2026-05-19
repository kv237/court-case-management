const supabase = require("../config/supabase");



// =====================================
// CASE STATUS ANALYTICS
// =====================================

const getCaseAnalytics = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("cases")

      .select("*");

    if (error) {
      throw error;
    }

    const pending =
      data.filter(
        item =>
          item.case_status === "Pending"
      ).length;

    const closed =
      data.filter(
        item =>
          item.case_status === "Closed"
      ).length;

    const ongoing =
      data.filter(
        item =>
          item.case_status === "Ongoing"
      ).length;

    res.status(200).json({

      success: true,

      analytics: {
        pending,
        closed,
        ongoing,
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
// MONTHLY HEARINGS ANALYTICS
// =====================================

const getHearingAnalytics = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("hearings")

      .select("*");

    if (error) {
      throw error;
    }

    const monthlyData = {};

    data.forEach(item => {

      const month =
        new Date(
          item.hearing_date
        ).toLocaleString(
          "default",
          {
            month: "short",
          }
        );

      monthlyData[month] =
        (monthlyData[month] || 0) + 1;

    });

    res.status(200).json({

      success: true,

      analytics: monthlyData,

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
// DOCUMENT ANALYTICS
// =====================================

const getDocumentAnalytics = async (req, res) => {

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

  getCaseAnalytics,

  getHearingAnalytics,

  getDocumentAnalytics,

};