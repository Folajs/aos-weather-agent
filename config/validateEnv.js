const requiredEnvVars = [
  "GROQ_API_KEY",
  "OPENWEATHER_API_KEY",
  "JWT_SECRET"
];

requiredEnvVars.forEach((envVar) => {

  if (!process.env[envVar]) {

    throw new Error(
      `Missing environment variable: ${envVar}`
    );
  }
});