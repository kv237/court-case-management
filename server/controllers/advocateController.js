const supabase = require("../config/supabase");



// =====================================
// CREATE ADVOCATE
// =====================================

const createAdvocate = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      specialization,
      address,
    } = req.body;

    const { data, error } = await supabase

      .from("advocates")

      .insert([
        {
          name,
          email,
          phone,
          specialization,
          address,
        },
      ])

      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({

      success: true,

      advocate: data,

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
// GET ALL ADVOCATES
// =====================================

const getAdvocates = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("advocates")

      .select("*")

      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      advocates: data,

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
// GET SINGLE ADVOCATE
// =====================================

const getAdvocateById = async (req, res) => {

  try {

    const { id } = req.params;

    const { data, error } = await supabase

      .from("advocates")

      .select("*")

      .eq("id", id)

      .single();

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      advocate: data,

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
// DELETE ADVOCATE
// =====================================

const deleteAdvocate = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase

      .from("advocates")

      .delete()

      .eq("id", id);

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      message: "Advocate Deleted",

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

  createAdvocate,

  getAdvocates,

  getAdvocateById,

  deleteAdvocate,

};