const supabase = require("../config/supabase");

const createAuditLog =
require("../utils/auditLogger");



// =====================================
// CREATE CASE
// =====================================

exports.createCase =
  async (req, res) => {

    try {

      const {

        case_title,

        case_number,

        court_name,

        case_type,

        description,

        hearing_date,

      } = req.body;



      const user_id =
        req.user.id;



      // Validation

      if (!case_title) {

        return res.status(400).json({

          success: false,

          message:
            "Case title is required",

        });

      }



      const { data, error } =
        await supabase
          .from("cases")
          .insert([
            {

              user_id,

              case_title,

              case_number,

              court_name,

              case_type,

              description,

              hearing_date,

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



      // AUDIT LOG

      await createAuditLog(

        req.user.id,

        "Created New Case",

        "Cases"

      );



      res.status(201).json({

        success: true,

        message:
          "Case Created Successfully",

        case: data[0],

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
// GET ALL CASES
// =====================================

exports.getCases =
  async (req, res) => {

    try {

      const user_id =
        req.user.id;



      const { data, error } =
        await supabase
          .from("cases")
          .select("*")
          .eq(
            "user_id",
            user_id
          )
          .order(
            "created_at",
            {
              ascending: false,
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

        cases: data,

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
// GET SINGLE CASE
// =====================================

exports.getSingleCase =
  async (req, res) => {

    try {

      const { id } =
        req.params;



      const { data, error } =
        await supabase
          .from("cases")
          .select("*")
          .eq("id", id)
          .single();



      if (error) {

        return res.status(404).json({

          success: false,

          message:
            "Case not found",

        });

      }



      res.status(200).json({

        success: true,

        case: data,

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
// UPDATE CASE
// =====================================

exports.updateCase =
  async (req, res) => {

    try {

      const { id } =
        req.params;



      const {

        case_title,

        case_number,

        court_name,

        case_type,

        case_status,

        description,

        hearing_date,

      } = req.body;



      const { data, error } =
        await supabase
          .from("cases")
          .update({

            case_title,

            case_number,

            court_name,

            case_type,

            case_status,

            description,

            hearing_date,

          })
          .eq("id", id)
          .select();



      if (error) {

        return res.status(500).json({

          success: false,

          message:
            error.message,

        });

      }



      // AUDIT LOG

      await createAuditLog(

        req.user.id,

        "Updated Case",

        "Cases"

      );



      res.status(200).json({

        success: true,

        message:
          "Case Updated Successfully",

        case: data[0],

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
// DELETE CASE
// =====================================

exports.deleteCase =
  async (req, res) => {

    try {

      const { id } =
        req.params;



      const { error } =
        await supabase
          .from("cases")
          .delete()
          .eq("id", id);



      if (error) {

        return res.status(500).json({

          success: false,

          message:
            error.message,

        });

      }



      // AUDIT LOG

      await createAuditLog(

        req.user.id,

        "Deleted Case",

        "Cases"

      );



      res.status(200).json({

        success: true,

        message:
          "Case Deleted Successfully",

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
// UPLOAD CASE FILE
// =====================================

exports.uploadCaseFile =
  async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({

          success: false,

          message:
            "No file uploaded",

        });

      }



      const file =
        req.file;



      const fileName = `${

        Date.now()

      }-${file.originalname}`;



      // Upload To Supabase Storage

      const { data, error } =
        await supabase.storage
          .from("case-files")
          .upload(
            fileName,
            file.buffer,
            {

              contentType:
                file.mimetype,

            }
          );



      if (error) {

        return res.status(500).json({

          success: false,

          message:
            error.message,

        });

      }



      // Public URL

      const {
        data: publicUrl,
      } = supabase.storage
        .from("case-files")
        .getPublicUrl(
          fileName
        );



      // AUDIT LOG

      await createAuditLog(

        req.user.id,

        "Uploaded Case File",

        "Cases"

      );



      res.status(200).json({

        success: true,

        message:
          "File Uploaded Successfully",

        fileUrl:
          publicUrl.publicUrl,

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