const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const analyticsController = require(
  "../controllers/analyticsController"
);



// =====================================
// CASE ANALYTICS
// =====================================

router.get(
  "/cases",
  verifyToken,
  analyticsController.getCaseAnalytics
);



// =====================================
// HEARING ANALYTICS
// =====================================

router.get(
  "/hearings",
  verifyToken,
  analyticsController.getHearingAnalytics
);



// =====================================
// DOCUMENT ANALYTICS
// =====================================

router.get(
  "/documents",
  verifyToken,
  analyticsController.getDocumentAnalytics
);



module.exports = router;