const supabase = require("../config/supabase");



// =====================================
// CREATE HEARING
// =====================================

exports.createHearing =
  async (req, res) => {

    try {

      const {

        case_id,

        hearing_title,

        hearing_date,

        hearing_location,

        hearing_notes,

      } = req.body;



      if (
        !case_id ||
        !hearing_title ||
        !hearing_date
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Required fields missing",

        });

      }



      const { data, error } =
        await supabase
          .from("hearings")
          .insert([
            {

              case_id,

              hearing_title,

              hearing_date,

              hearing_location,

              hearing_notes,

            },
          ])
          .select();



      if (error) {

        return res.status(500).json({

          success: false,

          message:
            error.message,

        });

      }



      res.status(201).json({

        success: true,

        message:
          "Hearing Created Successfully",

        hearing: data[0],

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };



// =====================================
// GET ALL HEARINGS
// =====================================

exports.getHearings =
  async (req, res) => {

    try {

      const { data, error } =
        await supabase
          .from("hearings")
          .select("*")
          .order(
            "hearing_date",
            {
              ascending: true,
            }
          );



      if (error) {

        return res.status(500).json({

          success: false,

          message:
            error.message,

        });

      }



      res.status(200).json({

        success: true,

        total:
          data.length,

        hearings: data,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };



// =====================================
// GET UPCOMING HEARINGS
// =====================================

exports.getUpcomingHearings =
  async (req, res) => {

    try {

      const currentDate =
        new Date();



      const { data, error } =
        await supabase
          .from("hearings")
          .select("*")
          .gte(
            "hearing_date",
            currentDate.toISOString()
          )
          .order(
            "hearing_date",
            {
              ascending: true,
            }
          );



      if (error) {

        return res.status(500).json({

          success: false,

          message:
            error.message,

        });

      }



      res.status(200).json({

        success: true,

        total:
          data.length,

        hearings: data,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };