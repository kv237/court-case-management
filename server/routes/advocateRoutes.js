const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const advocateController = require(
  "../controllers/advocateController"
);



// =====================================
// CREATE
// =====================================

router.post(
  "/",
  verifyToken,
  advocateController.createAdvocate
);



// =====================================
// GET ALL
// =====================================

router.get(
  "/",
  verifyToken,
  advocateController.getAdvocates
);



// =====================================
// GET SINGLE
// =====================================

router.get(
  "/:id",
  verifyToken,
  advocateController.getAdvocateById
);



// =====================================
// DELETE
// =====================================

router.delete(
  "/:id",
  verifyToken,
  advocateController.deleteAdvocate
);



module.exports = router;