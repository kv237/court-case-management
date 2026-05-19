const supabase = require("../config/supabase");



// =====================================
// ADD SCANNED DOCUMENT
// =====================================

const addScannedDocument = async (req, res) => {

  try {

    const {
      case_id,
      document_url,
      document_name,
    } = req.body;

    const { data, error } = await supabase

      .from("scanned_documents")

      .insert([
        {
          case_id,
          document_url,
          document_name,
        },
      ])

      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({

      success: true,

      scannedDocument: data,

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
// GET SCANNED DOCUMENTS
// =====================================

const getScannedDocuments = async (req, res) => {

  try {

    const { caseId } = req.params;

    const { data, error } = await supabase

      .from("scanned_documents")

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

      scannedDocuments: data,

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
// DELETE SCANNED DOCUMENT
// =====================================

const deleteScannedDocument = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase

      .from("scanned_documents")

      .delete()

      .eq("id", id);

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      message:
        "Scanned Document Deleted",

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

  addScannedDocument,

  getScannedDocuments,

  deleteScannedDocument,

};