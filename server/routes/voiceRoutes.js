const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const voiceController = require(
  "../controllers/voiceController"
);



// =====================================
// ADD VOICE NOTE
// =====================================

router.post(
  "/add",
  verifyToken,
  voiceController.addVoiceNote
);



// =====================================
// GET VOICE NOTES
// =====================================

router.get(
  "/:caseId",
  verifyToken,
  voiceController.getVoiceNotes
);



// =====================================
// DELETE VOICE NOTE
// =====================================

router.delete(
  "/:id",
  verifyToken,
  voiceController.deleteVoiceNote
);



module.exports = router;