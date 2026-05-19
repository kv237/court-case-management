const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const dashboardController = require(
  "../controllers/dashboardController"
);



// =====================================
// DASHBOARD STATS
// =====================================

router.get(
  "/stats",
  verifyToken,
  dashboardController.getDashboardStats
);



// =====================================
// RECENT CASES
// =====================================

router.get(
  "/recent-cases",
  verifyToken,
  dashboardController.getRecentCases
);



// =====================================
// UPCOMING HEARINGS
// =====================================

router.get(
  "/upcoming-hearings",
  verifyToken,
  dashboardController.getUpcomingHearings
);



module.exports = router;