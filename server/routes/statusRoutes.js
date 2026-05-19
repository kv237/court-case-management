const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const statusController = require(
  "../controllers/statusController"
);



// =====================================
// ADD STATUS
// =====================================

router.post(
  "/add",
  verifyToken,
  statusController.addCaseStatus
);



// =====================================
// GET STATUS HISTORY
// =====================================

router.get(
  "/:caseId",
  verifyToken,
  statusController.getCaseStatusHistory
);



module.exports = router;