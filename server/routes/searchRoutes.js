const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require(
  "../middleware/authMiddleware"
);

const {

  searchCases,

  searchDocuments,

  searchHearings,

} = require(
  "../controllers/searchController"
);



// =====================================
// SEARCH CASES
// =====================================

router.get(

  "/cases",

  verifyToken,

  searchCases

);



// =====================================
// SEARCH DOCUMENTS
// =====================================

router.get(

  "/documents",

  verifyToken,

  searchDocuments

);



// =====================================
// SEARCH HEARINGS
// =====================================

router.get(

  "/hearings",

  verifyToken,

  searchHearings

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
        "Search Routes Working",

    });

  }

);



module.exports = router;