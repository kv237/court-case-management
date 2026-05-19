const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const timelineController = require(
  "../controllers/timelineController"
);



// =====================================
// ADD ACTIVITY
// =====================================

router.post(
  "/add",
  verifyToken,
  timelineController.addTimelineActivity
);



// =====================================
// GET TIMELINE
// =====================================

router.get(
  "/:caseId",
  verifyToken,
  timelineController.getCaseTimeline
);



module.exports = router;