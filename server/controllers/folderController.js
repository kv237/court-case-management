const supabase =
require("../config/supabase");

// =====================================
// CREATE FOLDER
// =====================================

exports.createFolder =
  async (req, res) => {

    try {

      const {
        folder_name,
      } = req.body;

      if (!folder_name) {

        return res.status(400).json({

          success: false,

          message:
            "Folder name required",

        });

      }

      // CHECK EXISTING

      const {
        data: existingFolder,
      } = await supabase

        .from(
          "document_folders"
        )

        .select("*")

        .eq(
          "folder_name",
          folder_name
        )

        .single();

      if (existingFolder) {

        return res.status(400).json({

          success: false,

          message:
            "Folder already exists",

        });

      }

      // CREATE FOLDER

      const {
        data,
        error,
      } = await supabase

        .from(
          "document_folders"
        )

        .insert([

          {
            folder_name,
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
          "Folder Created Successfully",

        folder: data[0],

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
// GET FOLDERS
// =====================================

exports.getFolders =
  async (req, res) => {

    try {

      const {
        data,
        error,
      } = await supabase

        .from(
          "document_folders"
        )

        .select("*")

        .order(
          "created_at",
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

      return res.status(200).json({

        success: true,

        folders: data,

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
// RENAME FOLDER
// =====================================

exports.renameFolder =
  async (req, res) => {

    try {

      const {
        folder_name,
        new_name,
      } = req.body;

      if (
        !folder_name ||
        !new_name
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Folder names required",

        });

      }

      // CHECK IF NEW NAME EXISTS

      const {
        data: existingFolder,
      } = await supabase

        .from(
          "document_folders"
        )

        .select("*")

        .eq(
          "folder_name",
          new_name
        )

        .single();

      if (existingFolder) {

        return res.status(400).json({

          success: false,

          message:
            "Folder name already exists",

        });

      }

      // UPDATE FOLDER

      const {
        data,
        error,
      } = await supabase

        .from(
          "document_folders"
        )

        .update({

          folder_name:
            new_name,

        })

        .eq(
          "folder_name",
          folder_name
        )

        .select();

      if (error) {

        return res.status(500).json({

          success: false,

          message:
            error.message,

        });

      }

      // UPDATE DOCUMENTS INSIDE FOLDER

      await supabase

        .from("documents")

        .update({

          folder_name:
            new_name,

        })

        .eq(
          "folder_name",
          folder_name
        );

      return res.status(200).json({

        success: true,

        message:
          "Folder renamed successfully",

        folder: data[0],

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
// DELETE FOLDER
// =====================================

exports.deleteFolder =
  async (req, res) => {

    try {

      const {
        folder_name,
      } = req.body;

      if (!folder_name) {

        return res.status(400).json({

          success: false,

          message:
            "Folder name required",

        });

      }

      // DELETE DOCUMENTS INSIDE FOLDER

      await supabase

        .from("documents")

        .delete()

        .eq(
          "folder_name",
          folder_name
        );

      // DELETE FOLDER

      const {
        error,
      } = await supabase

        .from(
          "document_folders"
        )

        .delete()

        .eq(
          "folder_name",
          folder_name
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
          "Folder deleted successfully",

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