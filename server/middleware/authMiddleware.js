const jwt = require("jsonwebtoken");



// =====================================
// VERIFY JWT TOKEN
// =====================================

exports.verifyToken =
  async (req, res, next) => {

    try {

      const authHeader =
        req.headers.authorization;



      // Check Authorization Header

      if (!authHeader) {

        return res.status(401).json({

          success: false,

          message:
            "Access Denied. No token provided",

        });

      }



      // Check Bearer Format

      if (
        !authHeader.startsWith(
          "Bearer "
        )
      ) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid token format",

        });

      }



      // Extract Token

      const token =
        authHeader.split(" ")[1];



      if (!token) {

        return res.status(401).json({

          success: false,

          message:
            "Token missing",

        });

      }



      // Verify Token

      const decoded =
        jwt.verify(

          token,

          process.env.JWT_SECRET
        );



      // Store User Info

      req.user = decoded;



      next();

    } catch (error) {

      console.log(error);



      // JWT Expired

      if (
        error.name ===
        "TokenExpiredError"
      ) {

        return res.status(401).json({

          success: false,

          message:
            "Token Expired",

        });

      }



      // Invalid JWT

      if (
        error.name ===
        "JsonWebTokenError"
      ) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid Token",

        });

      }



      // General Error

      res.status(500).json({

        success: false,

        message:
          "Authentication Failed",

      });

    }

  };