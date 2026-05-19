const supabase = require("../config/supabase");



// =====================================
// ADD VOICE NOTE
// =====================================

const addVoiceNote = async (req, res) => {

  try {

    const {
      case_id,
      audio_url,
      note,
    } = req.body;

    const { data, error } = await supabase

      .from("voice_notes")

      .insert([
        {
          case_id,
          audio_url,
          note,
        },
      ])

      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({

      success: true,

      voiceNote: data,

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
// GET CASE VOICE NOTES
// =====================================

const getVoiceNotes = async (req, res) => {

  try {

    const { caseId } = req.params;

    const { data, error } = await supabase

      .from("voice_notes")

      .select("*")

      .eq("case_id", caseId)

      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      voiceNotes: data,

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
// DELETE VOICE NOTE
// =====================================

const deleteVoiceNote = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase

      .from("voice_notes")

      .delete()

      .eq("id", id);

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      message:
        "Voice Note Deleted",

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

  addVoiceNote,

  getVoiceNotes,

  deleteVoiceNote,

};