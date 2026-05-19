const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const shareController = require(
  "../controllers/shareController"
);



// =====================================
// SHARE DOCUMENT
// =====================================

router.post(
  "/",
  verifyToken,
  shareController.shareDocument
);



// =====================================
// GET SHARED DOCUMENTS
// =====================================

router.get(
  "/:caseId",
  verifyToken,
  shareController.getSharedDocuments
);



module.exports = router;