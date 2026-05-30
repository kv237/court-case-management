require("dotenv").config();

const express = require("express");

const cors = require("cors");

const path = require("path");

const helmet = require("helmet");

const rateLimit =
require("express-rate-limit");

const compression =
require("compression");

const http =
require("http");

const { Server } =
require("socket.io");



// ===============================
// ROUTES
// ===============================

const authRoutes =
require("./routes/authRoutes");

const caseRoutes =
require("./routes/caseRoutes");

const hearingRoutes =
require("./routes/hearingRoutes");

const documentRoutes =
require("./routes/documentRoutes");

const searchRoutes =
require("./routes/searchRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");

const timelineRoutes =
require("./routes/timelineRoutes");

const notificationRoutes =
require("./routes/notificationRoutes");

const calendarRoutes =
require("./routes/calendarRoutes");

const advocateRoutes =
require("./routes/advocateRoutes");

const statusRoutes =
require("./routes/statusRoutes");

const voiceRoutes =
require("./routes/voiceRoutes");

const scanRoutes =
require("./routes/scanRoutes");

const shareRoutes =
require("./routes/shareRoutes");

const signatureRoutes =
require("./routes/signatureRoutes");

const reportRoutes =
require("./routes/reportRoutes");

const analyticsRoutes =
require("./routes/analyticsRoutes");

const pdfRoutes =
require("./routes/pdfRoutes");

const emailRoutes =
require("./routes/emailRoutes");

const folderRoutes =
require("./routes/folderRoutes");

const profileRoutes =
require("./routes/profileRoutes");



// ===============================
// APP
// ===============================

const app = express();

app.set("trust proxy", 1);



// ===============================
// SECURITY
// ===============================

app.use(helmet());

app.use(compression());



// ===============================
// CORS
// ===============================

const allowedOrigins = [
  "http://localhost:5173",
  "https://localhost",
  "capacitor://localhost",
  "https://court-case-management-nu.vercel.app",
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(

  cors({

    origin: function (origin, callback) {

      // allow requests without origin
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {

        callback(null, true);

      } else {

        console.log("Blocked Origin:", origin);

        callback(new Error("CORS Not Allowed"));

      }

    },

    credentials: true,

  })

);



// ===============================
// RATE LIMITER
// ONLY AUTH ROUTES
// ===============================

const authLimiter =
rateLimit({

  windowMs:
    15 * 60 * 1000,

  max: 100,

  message: {

    success: false,

    message:
      "Too many requests. Please try again later.",

  },

  standardHeaders: true,

  legacyHeaders: false,

});



// ===============================
// GENERAL MIDDLEWARES
// ===============================

app.use(express.json());

app.use(

  express.urlencoded({

    extended: true,

  })

);



// ===============================
// STATIC UPLOADS
// ===============================

app.use(

  "/uploads",

  express.static(

    path.join(

      __dirname,

      "uploads"

    )

  )

);



// ===============================
// API ROUTES
// ===============================

// AUTH

app.use(

  "/api/auth",

  authLimiter,

  authRoutes

);

// CASES

app.use(
  "/api/cases",
  caseRoutes
);

// HEARINGS

app.use(
  "/api/hearings",
  hearingRoutes
);

// DOCUMENTS

app.use(
  "/api/documents",
  documentRoutes
);

// SEARCH

app.use(
  "/api/search",
  searchRoutes
);

// DASHBOARD

app.use(
  "/api/dashboard",
  dashboardRoutes
);

// TIMELINE

app.use(
  "/api/timeline",
  timelineRoutes
);

// NOTIFICATIONS

app.use(
  "/api/notifications",
  notificationRoutes
);

// CALENDAR

app.use(
  "/api/calendar",
  calendarRoutes
);

// ADVOCATES

app.use(
  "/api/advocates",
  advocateRoutes
);

// STATUS

app.use(
  "/api/status-tracking",
  statusRoutes
);

// VOICE NOTES

app.use(
  "/api/voice-notes",
  voiceRoutes
);

// SCANS

app.use(
  "/api/scans",
  scanRoutes
);

// SHARES

app.use(
  "/api/shares",
  shareRoutes
);

// SIGNATURES

app.use(
  "/api/signatures",
  signatureRoutes
);

// REPORTS

app.use(
  "/api/reports",
  reportRoutes
);

// ANALYTICS

app.use(
  "/api/analytics",
  analyticsRoutes
);

// PDF

app.use(
  "/api/pdf",
  pdfRoutes
);

// EMAIL

app.use(
  "/api/email",
  emailRoutes
);

// FOLDERS

app.use(
  "/api/folders",
  folderRoutes
);

// PROFILE

app.use(
  "/api/profile",
  profileRoutes
);



// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "🚀 Court Case Backend Running Successfully",

  });

});



// ===============================
// HEALTH CHECK
// ===============================

app.get(

  "/api/status",

  (req, res) => {

    res.status(200).json({

      success: true,

      server: "Running",

      timestamp:
        new Date(),

    });

  }

);



// ===============================
// ADDITIONAL HEALTH ROUTE
// ===============================

app.get("/api/health", (req, res) => {

  res.status(200).json({

    success: true,

    message: "Backend Healthy",

    server: "Running",

    timestamp: new Date(),

  });

});



// ===============================
// 404 ROUTE
// ===============================

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message:
      "Route Not Found",

  });

});



// ===============================
// GLOBAL ERROR HANDLER
// ===============================

app.use(

  (
    err,
    req,
    res,
    next
  ) => {

    console.error(
      err.stack
    );

    res.status(500).json({

      success: false,

      message:
        "Internal Server Error",

    });

  }

);



// ===============================
// SOCKET.IO
// ===============================

const server =
http.createServer(app);

const io =
new Server(server, {

  cors: {

    origin: [
  "http://localhost:5173",
  "https://localhost",
  "capacitor://localhost",
  "https://court-case-management-nu.vercel.app",
],

    credentials: true,

  },

});

io.on(

  "connection",

  socket => {

    console.log(
      "⚡ User Connected"
    );

    socket.on(

      "disconnect",

      () => {

        console.log(
          "❌ User Disconnected"
        );

      }

    );

  }

);



// ===============================
// SERVER
// ===============================

const PORT =
process.env.PORT || 5000;

server.listen(

  PORT,

  () => {

    console.log(`

====================================
🚀 Server Running Successfully
🌍 PORT: ${PORT}
====================================

`);

  }

);