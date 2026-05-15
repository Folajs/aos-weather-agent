require("dotenv").config();
require("./config/validateEnv");

const express = require("express");
const cors = require("cors");

const jwt = require("jsonwebtoken");

const {
  loginAdmin
} = require("./services/authService");

const authMiddleware =
  require(
    "./middleware/authMiddleware"
  );

const {
  getWeatherData
} = require("./services/weatherService");

const {
  generateAdvice,
  generateMultiDayAdvice
} = require("./services/aiService");

const {
  getFarmers,
  getFarmerById
} = require("./services/aosService");

const loggerMiddleware =
  require("./middleware/logger");

const app = express();


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// REQUEST LOGGER
app.use(loggerMiddleware);


// API VERSION PREFIX
const API_PREFIX = "/api/v1";


// HOME
app.get(`${API_PREFIX}/`, (req, res) => {

  res.json({
    success: true,
    message:
      "AOS AI Weather Advisory Agent is running"
  });
});


// HEALTH CHECK
app.get(`${API_PREFIX}/health`, (req, res) => {

  res.json({
    success: true,
    status: "healthy",
    timestamp:
      new Date().toISOString()
  });
});

// LOGIN
app.post(
  `${API_PREFIX}/auth/login`,
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      const admin =
        await loginAdmin(
          email,
          password
        );

      if (!admin) {

        return res.status(401).json({
          success: false,
          error:
            "Invalid credentials"
        });
      }

      const token =
        jwt.sign(
          {
            id: admin.id,
            email: admin.email
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d"
          }
        );

      res.json({
        success: true,
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email
        }
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);

// GET ALL FARMERS
app.get(
  `${API_PREFIX}/farmers`,
   authMiddleware,
  async (req, res) => {

    try {

      const farmers =
        await getFarmers();

      res.json({
        success: true,
        totalFarmers:
          farmers.length,
        farmers
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);


// SINGLE FARMER ADVICE
app.get(
  `${API_PREFIX}/farmer-advice/:id`,
  authMiddleware,
  async (req, res) => {

    try {

      const farmer =
        await getFarmerById(
          req.params.id
        );

      if (!farmer) {

        return res.status(404).json({
          success: false,
          error:
            "Farmer not found"
        });
      }

      const weather =
        await getWeatherData(
          farmer.location
        );

      const advice =
        await generateAdvice({
          city: farmer.location,
          crop: farmer.crop,
          stage: farmer.stage,
          weather: weather.summary
        });

      res.json({
        success: true,

        generatedAt:
          new Date().toISOString(),

        farmer,

        weather:
          weather.summary,

        advice
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);


// MULTI DAY ADVICE
app.get(
  `${API_PREFIX}/multi-day-advice/:id`,
  authMiddleware,
  async (req, res) => {

    try {

      const farmer =
        await getFarmerById(
          req.params.id
        );

      if (!farmer) {

        return res.status(404).json({
          success: false,
          error:
            "Farmer not found"
        });
      }

      const weather =
        await getWeatherData(
          farmer.location
        );

      const advice =
        await generateMultiDayAdvice({
          city: farmer.location,
          crop: farmer.crop,
          stage: farmer.stage,
          weather: weather.summary
        });

      res.json({
        success: true,

        generatedAt:
          new Date().toISOString(),

        farmer,

        weather:
          weather.summary,

        advice
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);


// 404 HANDLER
app.use((req, res) => {

  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});


const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});