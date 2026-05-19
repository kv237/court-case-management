const supabase = require("../config/supabase");



// =====================================
// TODAY HEARINGS
// =====================================

const getTodayHearings = async (req, res) => {

  try {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const { data, error } = await supabase

      .from("hearings")

      .select("*")

      .eq("hearing_date", today)

      .order("hearing_date", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

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
// MONTH HEARINGS
// =====================================

const getMonthHearings = async (req, res) => {

  try {

    const { month } = req.params;

    const year =
      new Date().getFullYear();

    const startDate =
      `${year}-${month}-01`;

    const endDate =
      `${year}-${month}-31`;

    const { data, error } = await supabase

      .from("hearings")

      .select("*")

      .gte(
        "hearing_date",
        startDate
      )

      .lte(
        "hearing_date",
        endDate
      )

      .order("hearing_date", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

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



module.exports = {

  getTodayHearings,

  getMonthHearings,

};