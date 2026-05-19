const supabase = require("../config/supabase");



// =====================================
// SHARE DOCUMENT
// =====================================

const shareDocument = async (req, res) => {

  try {

    const {
      case_id,
      document_url,
      shared_via,
      recipient,
    } = req.body;

    const { data, error } = await supabase

      .from("shared_documents")

      .insert([
        {
          case_id,
          document_url,
          shared_via,
          recipient,
        },
      ])

      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({

      success: true,

      sharedDocument: data,

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
// GET SHARED DOCUMENTS
// =====================================

const getSharedDocuments = async (req, res) => {

  try {

    const { caseId } = req.params;

    const { data, error } = await supabase

      .from("shared_documents")

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

      sharedDocuments: data,

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

  shareDocument,

  getSharedDocuments,

};