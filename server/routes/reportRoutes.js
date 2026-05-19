const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const reportController = require(
  "../controllers/reportController"
);



// =====================================
// CASE REPORT
// =====================================

router.get(
  "/cases",
  verifyToken,
  reportController.getCaseReport
);



// =====================================
// HEARING REPORT
// =====================================

router.get(
  "/hearings",
  verifyToken,
  reportController.getHearingReport
);



// =====================================
// DOCUMENT REPORT
// =====================================

router.get(
  "/documents",
  verifyToken,
  reportController.getDocumentReport
);



module.exports = router;