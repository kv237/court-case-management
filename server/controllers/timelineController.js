const supabase = require("../config/supabase");



// =====================================
// ADD TIMELINE ACTIVITY
// =====================================

const addTimelineActivity = async (req, res) => {

  try {

    const {
      case_id,
      activity,
    } = req.body;

    const { data, error } = await supabase

      .from("case_timeline")

      .insert([
        {
          case_id,
          activity,
        },
      ])

      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({

      success: true,

      message:
        "Timeline Activity Added",

      timeline: data,

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
// GET CASE TIMELINE
// =====================================

const getCaseTimeline = async (req, res) => {

  try {

    const { caseId } = req.params;

    const { data, error } = await supabase

      .from("case_timeline")

      .select("*")

      .eq("case_id", caseId)

      .order("activity_date", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      timeline: data,

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

  addTimelineActivity,

  getCaseTimeline,

};