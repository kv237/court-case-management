const express =
require("express");

const router =
express.Router();

const {
  verifyToken,
} = require(
  "../middleware/authMiddleware"
);

const emailController =
require(
  "../controllers/emailController"
);

router.post(
  "/send",
  verifyToken,
  emailController.sendEmail
);

module.exports =
router;