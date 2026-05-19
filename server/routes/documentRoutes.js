const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require(
  "../middleware/authMiddleware"
);

const upload =
  require(
    "../middleware/uploadMiddleware"
  );

const {

  saveDocument,

  getAllDocuments,

  getCaseDocuments,

  deleteDocument,

} = require(
  "../controllers/documentController"
);

// =====================================
// SAVE DOCUMENT
// =====================================

router.post(

  "/save",

  verifyToken,

  upload.single("file"),

  saveDocument

);

// =====================================
// GET ALL DOCUMENTS
// =====================================

router.get(

  "/all",

  verifyToken,

  getAllDocuments

);

// =====================================
// GET CASE DOCUMENTS
// =====================================

router.get(

  "/case/:caseId",

  verifyToken,

  getCaseDocuments

);

// =====================================
// DELETE DOCUMENT
// =====================================

router.delete(

  "/delete/:id",

  verifyToken,

  deleteDocument

);

// =====================================
// TEST ROUTE
// =====================================

router.get(

  "/test",

  (req, res) => {

    res.json({

      success: true,

      message:
        "Document Routes Working",

    });

  }

);

module.exports = router;