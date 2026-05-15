const axios = require("axios");

async function getWeatherData(city) {

  try {

    const apiKey =
      process.env.OPENWEATHER_API_KEY;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = response.data;

    // 24 forecast entries = 72 hours
    const forecasts =
      data.list.slice(0, 24);

    let totalRainfall = 0;
    let totalTemp = 0;
    let maxTemp = -Infinity;
    let minTemp = Infinity;
    let avgHumidity = 0;
    let averageRainProbability = 0;

    // DAILY GROUPS
    const dailyForecasts = {
      "Day 1": [],
      "Day 2": [],
      "Day 3": []
    };

    forecasts.forEach((forecast, index) => {

      const temp =
        forecast.main.temp;

      totalTemp += temp;

      totalRainfall +=
        forecast.rain?.["3h"] || 0;

      maxTemp =
        Math.max(maxTemp, temp);

      minTemp =
        Math.min(minTemp, temp);

      avgHumidity +=
        forecast.main.humidity;

      averageRainProbability +=
        (forecast.pop || 0) * 100;

      // SPLIT INTO DAYS
      if (index < 8) {
        dailyForecasts["Day 1"].push(forecast);
      }
      else if (index < 16) {
        dailyForecasts["Day 2"].push(forecast);
      }
      else {
        dailyForecasts["Day 3"].push(forecast);
      }
    });

    // BUILD DAILY ANALYTICS
    const dailyAnalytics =
      Object.entries(dailyForecasts)
        .map(([day, items]) => {

          let dayTemp = 0;
          let dayHumidity = 0;
          let dayRain = 0;

          items.forEach((item) => {

            dayTemp += item.main.temp;

            dayHumidity +=
              item.main.humidity;

            dayRain +=
              (item.pop || 0) * 100;
          });

          return {
            day,

            avgTemp: Number(
              (
                dayTemp /
                items.length
              ).toFixed(1)
            ),

            avgHumidity: Number(
              (
                dayHumidity /
                items.length
              ).toFixed(1)
            ),

            rainProbability: Number(
              (
                dayRain /
                items.length
              ).toFixed(1)
            )
          };
        });

    return {

      location: data.city.name,

      summary: {

        city: data.city.name,

        forecastCount:
          forecasts.length,

        fetchedAt:
          new Date().toISOString(),

        avgTemp: Number(
          (
            totalTemp /
            forecasts.length
          ).toFixed(1)
        ),

        maxTemp:
          Number(maxTemp.toFixed(1)),

        minTemp:
          Number(minTemp.toFixed(1)),

        avgHumidity: Number(
          (
            avgHumidity /
            forecasts.length
          ).toFixed(1)
        ),

        rainProbability: Number(
          (
            averageRainProbability /
            forecasts.length
          ).toFixed(1)
        ),

        totalRainfall: Number(
          totalRainfall.toFixed(1)
        ),

        dailyAnalytics
      }
    };

  } catch (error) {

    console.log(
      "Weather API failed. Using mock weather data."
    );

    return {

      location: city,

      summary: {

        avgTemp: 30,
        maxTemp: 39,
        minTemp: 24,
        avgHumidity: 50,
        rainProbability: 10,
        totalRainfall: 1,

        dailyAnalytics: [
          {
            day: "Day 1",
            avgTemp: 31,
            avgHumidity: 52,
            rainProbability: 10
          },
          {
            day: "Day 2",
            avgTemp: 34,
            avgHumidity: 48,
            rainProbability: 20
          },
          {
            day: "Day 3",
            avgTemp: 29,
            avgHumidity: 60,
            rainProbability: 70
          }
        ]
      }
    };
  }
}

module.exports = {
  getWeatherData
};
// const axios = require("axios");

// async function getWeatherData(city) {

//   try {

//     const apiKey =
//       process.env.OPENWEATHER_API_KEY;

//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
//     );

//     const data = response.data;

//     const forecasts =
//       data.list.slice(0, 24);

//     let totalRainfall = 0;
//     let totalTemp = 0;
//     let maxTemp = -Infinity;
//     let minTemp = Infinity;
//     let avgHumidity = 0;
//     let averageRainProbability = 0;

//     forecasts.forEach((forecast) => {

//       const temp =
//         forecast.main.temp;

//       totalTemp += temp;

//       totalRainfall +=
//         forecast.rain?.["3h"] || 0;

//       maxTemp =
//         Math.max(maxTemp, temp);

//       minTemp =
//         Math.min(minTemp, temp);

//       avgHumidity +=
//         forecast.main.humidity;

//       averageRainProbability +=
//         (forecast.pop || 0) * 100;
//     });

//     return {

//       location: data.city.name,

//       summary: {

//         city: data.city.name,
//         forecastCount:
//           forecasts.length,
//         fetchedAt:
//           new Date().toISOString(),
          
//         avgTemp: Number(
//           (
//             totalTemp /
//             forecasts.length
//           ).toFixed(1)
//         ),
//         maxTemp:
//           Number(maxTemp.toFixed(1)),

//         minTemp:
//           Number(minTemp.toFixed(1)),

//         avgHumidity: Number(
//           (
//             avgHumidity /
//             forecasts.length
//           ).toFixed(1)
//         ),

//         rainProbability: Number(
//           (
//             averageRainProbability /
//             forecasts.length
//           ).toFixed(1)
//         ),

//         totalRainfall: Number(
//           totalRainfall.toFixed(1)
//         )
//       }
//     };

//   } catch (error) {

//     console.log(
//       "Weather API failed. Using mock weather data."
//     );

//     return {

//       location: city,

//       summary: {
//         avgTemp: 30,
//         maxTemp: 39,
//         minTemp: 24,
//         avgHumidity: 50,
//         rainProbability: 10,
//         totalRainfall: 1
//       }
//     };
//   }
// }

// module.exports = {
//   getWeatherData
// };