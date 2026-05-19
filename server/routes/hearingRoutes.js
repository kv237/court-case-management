const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require(
  "../middleware/authMiddleware"
);

const {

  createHearing,

  getHearings,

  getUpcomingHearings,

} = require(
  "../controllers/hearingController"
);



// =====================================
// CREATE HEARING
// =====================================

router.post(

  "/create",

  verifyToken,

  createHearing

);



// =====================================
// GET ALL HEARINGS
// =====================================

router.get(

  "/all",

  verifyToken,

  getHearings

);



// =====================================
// GET UPCOMING HEARINGS
// =====================================

router.get(

  "/upcoming",

  verifyToken,

  getUpcomingHearings

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
        "Hearing Routes Working",

    });

  }

);



module.exports = router;