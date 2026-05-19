const supabase = require("../config/supabase");



// =====================================
// SEARCH CASES
// =====================================

exports.searchCases =
  async (req, res) => {

    try {

      const {

        query,

        case_status,

        case_type,

      } = req.query;



      let searchQuery =
        supabase
          .from("cases")
          .select("*");



      // Search by Title

      if (query) {

        searchQuery =
          searchQuery.ilike(
            "case_title",
            `%${query}%`
          );

      }



      // Filter by Status

      if (case_status) {

        searchQuery =
          searchQuery.eq(
            "case_status",
            case_status
          );

      }



      // Filter by Type

      if (case_type) {

        searchQuery =
          searchQuery.eq(
            "case_type",
            case_type
          );

      }



      const { data, error } =
        await searchQuery.order(
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

        results: data,

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
// SEARCH DOCUMENTS
// =====================================

exports.searchDocuments =
  async (req, res) => {

    try {

      const { query } =
        req.query;



      let searchQuery =
        supabase
          .from("documents")
          .select("*");



      if (query) {

        searchQuery =
          searchQuery.ilike(
            "document_name",
            `%${query}%`
          );

      }



      const { data, error } =
        await searchQuery.order(
          "uploaded_at",
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

        results: data,

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
// SEARCH HEARINGS
// =====================================

exports.searchHearings =
  async (req, res) => {

    try {

      const { query } =
        req.query;



      let searchQuery =
        supabase
          .from("hearings")
          .select("*");



      if (query) {

        searchQuery =
          searchQuery.ilike(
            "hearing_title",
            `%${query}%`
          );

      }



      const { data, error } =
        await searchQuery.order(
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

        results: data,

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