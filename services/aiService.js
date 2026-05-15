const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


// FALLBACK RULE-BASED ADVICE
function generateFallbackAdvice(data) {

  const {
    city,
    crop,
    stage,
    weather
  } = data;

  const advice = [];

  // TEMPERATURE
  if (weather.avgTemp > 35) {

    advice.push({
      level: "danger",
      type: "temperature",
      title: "Extreme Heat Alert",
      message:
        `Extreme heat detected in ${city}. ${crop} crops may experience heat stress and moisture loss.`,
      action:
        "Increase irrigation frequency and avoid fertilizer application during peak afternoon heat."
    });

  } else {

    advice.push({
      level: "good",
      type: "temperature",
      title: "Favourable Temperature",
      message:
        `Temperature conditions are favourable for healthy ${crop} growth.`,
      action:
        "Continue normal farm activities and monitor soil moisture regularly."
    });
  }

  // RAINFALL
  if (weather.totalRainfall < 5) {

    advice.push({
      level: "warning",
      type: "rainfall",
      title: "Low Rainfall Expected",
      message:
        "Rainfall levels are too low for optimal crop development.",
      action:
        "Use irrigation early morning or evening to maintain soil moisture."
    });
  }

  // HUMIDITY
  if (weather.avgHumidity > 85) {

    advice.push({
      level: "warning",
      type: "humidity",
      title: "High Humidity Risk",
      message:
        "High humidity may encourage fungal diseases and pest infestation.",
      action:
        "Inspect crops regularly and improve farm ventilation if possible."
    });
  }

  // FLOWERING STAGE
  if (stage === "Flowering") {

    advice.push({
      level: "info",
      type: "growth-stage",
      title: "Flowering Stage Monitoring",
      message:
        `${crop} is currently in the flowering stage and requires balanced nutrients.`,
      action:
        "Apply nutrients carefully and avoid excessive water stress."
    });
  }

  // HARVESTING STAGE
  if (stage === "Harvesting") {

    advice.push({
      level: "warning",
      type: "harvest",
      title: "Harvest Preparation",
      message:
        "Weather conditions may affect harvesting quality and storage.",
      action:
        "Prepare harvesting equipment and dry storage areas in advance."
    });
  }

  return advice;
}


// AI ADVICE
async function generateAdvice(data) {

  try {

    const {
      city,
      crop,
      stage,
      weather
    } = data;

    const prompt = `
You are an advanced agricultural weather advisory AI for Nigerian farmers.

Your task is to generate highly practical and detailed farming recommendations.

Farmer Information:
- Location: ${city}
- Crop: ${crop}
- Growth Stage: ${stage}

Weather Summary:
- Average Temperature: ${weather.avgTemp}°C
- Maximum Temperature: ${weather.maxTemp}°C
- Minimum Temperature: ${weather.minTemp}°C
- Average Humidity: ${weather.avgHumidity}%
- Rain Probability: ${weather.rainProbability}%
- Total Rainfall: ${weather.totalRainfall}mm

Generate intelligent agricultural advice based on:
1. Heat stress
2. Irrigation needs
3. Rainfall adequacy
4. Disease risks
5. Humidity effects
6. Crop growth stage
7. Harvest planning
8. Fertilizer timing
9. Pest risks
10. Soil moisture concerns

Return ONLY a valid JSON array.

Format:
[
  {
    "level": "warning",
    "type": "irrigation",
    "title": "Increase Irrigation",
    "message": "Low rainfall and high heat may reduce soil moisture.",
    "action": "Irrigate 2 times daily if soil becomes dry."
  }
]

Allowed levels:
- good
- info
- warning
- danger

Do not include markdown.
Do not explain anything outside JSON.
`;

    const completion =
      await groq.chat.completions.create({

        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ],

        temperature: 0.4
      });

    const content =
      completion.choices[0]
        .message.content;

    return JSON.parse(content);

  } catch (error) {

    console.error(
      "Groq AI failed. Using fallback advice."
    );

    return generateFallbackAdvice(data);
  }
}


// MULTI DAY ADVICE
async function generateMultiDayAdvice(data) {

  const recommendations =
    await generateAdvice(data);

  let rawScore = 0;

  recommendations.forEach((item) => {

    if (item.level === "danger") {
      rawScore += 40;
    }

    if (item.level === "warning") {
      rawScore += 20;
    }

    if (item.level === "info") {
      rawScore += 10;
    }

    if (item.level === "good") {
      rawScore += 0;
    }
  });


  // MAX POSSIBLE SCORE
  const maxPossibleScore =
    recommendations.length * 40;


  // NORMALIZE TO 0–100
  const riskScore =
    Math.min(
      100,
      Math.round(
        (rawScore / maxPossibleScore) * 100
      )
    );


  // RISK LEVELS
  let riskLevel = "Low";

  if (riskScore >= 75) {

    riskLevel = "Critical";

  } else if (riskScore >= 50) {

    riskLevel = "High";

  } else if (riskScore >= 25) {

    riskLevel = "Medium";
  }


  return {

    generatedAt:
      new Date().toISOString(),

    advisoryPeriod:
      "3-Day Forecast",

    riskScore,

    riskLevel,

    recommendations
  };
}

module.exports = {
  generateAdvice,
  generateMultiDayAdvice
};