const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const calendarController = require(
  "../controllers/calendarController"
);



// =====================================
// TODAY HEARINGS
// =====================================

router.get(
  "/today",
  verifyToken,
  calendarController.getTodayHearings
);



// =====================================
// MONTH HEARINGS
// =====================================

router.get(
  "/month/:month",
  verifyToken,
  calendarController.getMonthHearings
);



module.exports = router;