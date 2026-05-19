const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const signatureController = require(
  "../controllers/signatureController"
);



// =====================================
// ADD SIGNATURE
// =====================================

router.post(
  "/add",
  verifyToken,
  signatureController.addSignature
);



// =====================================
// GET SIGNATURES
// =====================================

router.get(
  "/:caseId",
  verifyToken,
  signatureController.getSignatures
);



module.exports = router;