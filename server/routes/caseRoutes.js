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

  createCase,

  getCases,

  getSingleCase,

  updateCase,

  deleteCase,

  uploadCaseFile,

} = require(
  "../controllers/caseController"
);



// =====================================
// CREATE CASE
// =====================================

router.post(

  "/create",

  verifyToken,

  createCase

);



// =====================================
// GET ALL CASES
// =====================================

router.get(

  "/all",

  verifyToken,

  getCases

);



// =====================================
// GET SINGLE CASE
// =====================================

router.get(

  "/:id",

  verifyToken,

  getSingleCase

);



// =====================================
// UPDATE CASE
// =====================================

router.put(

  "/update/:id",

  verifyToken,

  updateCase

);



// =====================================
// DELETE CASE
// =====================================

router.delete(

  "/delete/:id",

  verifyToken,

  deleteCase

);



// =====================================
// UPLOAD CASE FILE
// =====================================

router.post(

  "/upload",

  verifyToken,

  upload.single("file"),

  uploadCaseFile

);



// =====================================
// TEST ROUTE
// =====================================

router.get(

  "/test",

  (req, res) => {

    res.status(200).json({

      success: true,

      message:
        "Case Routes Working",

    });

  }

);



module.exports = router;