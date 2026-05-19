const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const notificationController = require(
  "../controllers/notificationController"
);



// =====================================
// CREATE
// =====================================

router.post(
  "/create",
  verifyToken,
  notificationController.createNotification
);



// =====================================
// GET ALL
// =====================================

router.get(
  "/all",
  verifyToken,
  notificationController.getNotifications
);



// =====================================
// MARK READ
// =====================================

router.put(
  "/read/:id",
  verifyToken,
  notificationController.markAsRead
);



module.exports = router;