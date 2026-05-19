const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require(
  "../middleware/authMiddleware"
);

const {
  createFolder,
  getFolders,
  renameFolder,
  deleteFolder,
} = require(
  "../controllers/folderController"
);

// =====================================
// CREATE FOLDER
// =====================================

router.post(
  "/create",
  verifyToken,
  createFolder
);

// =====================================
// GET FOLDERS
// =====================================

router.get(
  "/all",
  verifyToken,
  getFolders
);

// =====================================
// RENAME FOLDER
// =====================================

router.put(
  "/rename",
  verifyToken,
  renameFolder
);

// =====================================
// DELETE FOLDER
// =====================================

router.delete(
  "/delete",
  verifyToken,
  deleteFolder
);

module.exports = router;