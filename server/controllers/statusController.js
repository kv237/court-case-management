const supabase = require("../config/supabase");



// =====================================
// ADD STATUS
// =====================================

const addCaseStatus = async (req, res) => {

  try {

    const {
      case_id,
      status,
      remarks,
    } = req.body;

    const { data, error } = await supabase

      .from("case_status_tracking")

      .insert([
        {
          case_id,
          status,
          remarks,
        },
      ])

      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({

      success: true,

      tracking: data,

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
// GET STATUS HISTORY
// =====================================

const getCaseStatusHistory = async (req, res) => {

  try {

    const { caseId } = req.params;

    const { data, error } = await supabase

      .from("case_status_tracking")

      .select("*")

      .eq("case_id", caseId)

      .order("updated_at", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      history: data,

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

  addCaseStatus,

  getCaseStatusHistory,

};