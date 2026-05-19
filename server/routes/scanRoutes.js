const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const scanController = require(
  "../controllers/scanController"
);



// =====================================
// ADD SCANNED DOC
// =====================================

router.post(
  "/add",
  verifyToken,
  scanController.addScannedDocument
);



// =====================================
// GET DOCS
// =====================================

router.get(
  "/:caseId",
  verifyToken,
  scanController.getScannedDocuments
);



// =====================================
// DELETE DOC
// =====================================

router.delete(
  "/:id",
  verifyToken,
  scanController.deleteScannedDocument
);



module.exports = router;