const express =
require("express");

const router =
express.Router();

const {
  verifyToken,
} = require(
  "../middleware/authMiddleware"
);

const pdfController =
require(
  "../controllers/pdfController"
);



// =====================================
// EXPORT CASES PDF
// =====================================

router.get(
  "/cases",
  verifyToken,
  pdfController.exportCasesPDF
);

module.exports =
router;