const supabase = require("../config/supabase");



// =====================================
// CREATE NOTIFICATION
// =====================================

const createNotification = async (req, res) => {

  try {

    const {
      title,
      message,
    } = req.body;

    const { data, error } = await supabase

      .from("notifications")

      .insert([
        {
          title,
          message,
        },
      ])

      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({

      success: true,

      notification: data,

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
// GET ALL NOTIFICATIONS
// =====================================

const getNotifications = async (req, res) => {

  try {

    const { data, error } = await supabase

      .from("notifications")

      .select("*")

      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      notifications: data,

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
// MARK AS READ
// =====================================

const markAsRead = async (req, res) => {

  try {

    const { id } = req.params;

    const { data, error } = await supabase

      .from("notifications")

      .update({
        is_read: true,
      })

      .eq("id", id)

      .select();

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      notification: data,

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

  createNotification,

  getNotifications,

  markAsRead,

};