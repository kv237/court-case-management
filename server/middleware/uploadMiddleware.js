const multer =
require("multer");

// =====================================
// MEMORY STORAGE
// =====================================

const storage =
  multer.memoryStorage();

// =====================================
// FILE FILTER
// =====================================

const fileFilter =
  (req, file, cb) => {

    // ALLOW ALL FILE TYPES

    cb(null, true);

  };

// =====================================
// MULTER CONFIG
// =====================================

const upload =
  multer({

    storage,

    limits: {

      fileSize:
        10 * 1024 * 1024,

    },

    fileFilter,

  });

// EXPORT

module.exports =
  upload;