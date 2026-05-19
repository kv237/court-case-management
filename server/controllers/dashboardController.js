const supabase =
require("../config/supabase");

// =====================================
// DASHBOARD STATS
// =====================================

const getDashboardStats =
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      const {
        count: totalDocuments,
      } = await supabase

        .from("documents")

        .select("*", {
          count: "exact",
          head: true,
        })

        .eq(
          "uploaded_by",
          userId
        );

      res.status(200).json({

        success: true,

        stats: {

          totalDocuments:
            totalDocuments || 0,

        },

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// =====================================
// RECENT DOCUMENTS
// =====================================

const getRecentCases =
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
        )

        .limit(5);

      if (error) {

        throw error;

      }

      res.status(200).json({

        success: true,

        recentCases: data,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// =====================================
// UPCOMING HEARINGS
// =====================================

const getUpcomingHearings =
  async (req, res) => {

    return res.status(200).json({

      success: true,

      hearings: [],

    });

  };

module.exports = {

  getDashboardStats,

  getRecentCases,

  getUpcomingHearings,

};