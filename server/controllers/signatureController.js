const supabase = require("../config/supabase");



// =====================================
// ADD SIGNATURE
// =====================================

const addSignature = async (req, res) => {

  try {

    const {
      case_id,
      signer_name,
      signature_url,
    } = req.body;

    const { data, error } = await supabase

      .from("digital_signatures")

      .insert([
        {
          case_id,
          signer_name,
          signature_url,
        },
      ])

      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({

      success: true,

      signature: data,

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
// GET SIGNATURES
// =====================================

const getSignatures = async (req, res) => {

  try {

    const { caseId } = req.params;

    const { data, error } = await supabase

      .from("digital_signatures")

      .select("*")

      .eq("case_id", caseId)

      .order("signed_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      signatures: data,

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

  addSignature,

  getSignatures,

};