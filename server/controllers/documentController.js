const supabase =
require("../config/supabase");

// =====================================
// SAVE DOCUMENT
// =====================================

exports.saveDocument =
  async (req, res) => {

    try {

      const {

        case_number,

        document_type,

        description,

      } = req.body;

      const uploaded_by =
        req.user.id;

      // CHECK FILE

      if (!req.file) {

        return res.status(400).json({

          success: false,

          message:
            "No file uploaded",

        });

      }

      const file =
        req.file;

      // UNIQUE FILE NAME

      const fileName =

        `${Date.now()}-${file.originalname}`;

      // =====================================
      // FILE PATH
      // =====================================

      const filePath =

        `${uploaded_by}/${case_number}/${document_type}/${fileName}`;

      // =====================================
      // UPLOAD STORAGE
      // =====================================

      const {
        error: uploadError,
      } = await supabase.storage

        .from("documents")

        .upload(

          filePath,

          file.buffer,

          {

            contentType:
  file.mimetype ||
  "application/octet-stream",
          }

        );

      if (uploadError) {

        return res.status(500).json({

          success: false,

          message:
            uploadError.message,

        });

      }

      // =====================================
      // PUBLIC URL
      // =====================================

      const {
        data: publicUrlData,
      } = supabase.storage

        .from("documents")

        .getPublicUrl(
          filePath
        );

      // =====================================
      // SAVE DATABASE
      // =====================================

      const {
        data,
        error,
      } = await supabase

        .from("documents")

        .insert([

          {

            case_number,

            uploaded_by,

            document_name:
              file.originalname,

            document_type,

            description,

            file_url:
              publicUrlData.publicUrl,

            file_size:
              file.size,

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

      return res.status(201).json({

        success: true,

        message:
          "Document Uploaded Successfully",

        document:
          data[0],

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };

// =====================================
// GET ALL DOCUMENTS
// =====================================

exports.getAllDocuments =
  async (req, res) => {

    try {

      const {
        data,
        error,
      } = await supabase

        .from("documents")

        .select("*")

        .eq(
          "uploaded_by",
          req.user.id
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

      return res.status(200).json({

        success: true,

        total:
          data.length,

        documents: data,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };

// =====================================
// GET DOCUMENTS BY CASE
// =====================================

exports.getCaseDocuments =
  async (req, res) => {

    try {

      const { caseId } =
        req.params;

      const {
        data,
        error,
      } = await supabase

        .from("documents")

        .select("*")

        .eq(
          "case_number",
          caseId
        )

        .eq(
          "uploaded_by",
          req.user.id
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

      return res.status(200).json({

        success: true,

        total:
          data.length,

        documents: data,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };

// =====================================
// DELETE DOCUMENT
// =====================================

exports.deleteDocument =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        error,
      } = await supabase

        .from("documents")

        .delete()

        .eq("id", id)

        .eq(
          "uploaded_by",
          req.user.id
        );

      if (error) {

        return res.status(500).json({

          success: false,

          message:
            error.message,

        });

      }

      return res.status(200).json({

        success: true,

        message:
          "Document Deleted Successfully",

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };