import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts";

function WeatherChart({ weather }) {

  const data =
    weather.dailyAnalytics || [];

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        height: "420px",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h2
        style={{
          marginBottom: "20px"
        }}
      >
        3-Day Weather Forecast
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >
        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Legend />

          {/* TEMPERATURE */}
          <Line
            type="monotone"
            dataKey="avgTemp"
            name="Temperature (°C)"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 5 }}
          />

          {/* HUMIDITY */}
          <Line
            type="monotone"
            dataKey="avgHumidity"
            name="Humidity (%)"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 5 }}
          />

          {/* RAIN */}
          <Line
            type="monotone"
            dataKey="rainProbability"
            name="Rain Probability (%)"
            stroke="#16a34a"
            strokeWidth={3}
            dot={{ r: 5 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeatherChart;
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer
// } from "recharts";

// function WeatherChart({ weather }) {

//   const data = [
//     {
//       name: "Avg Temp",
//       value: weather.avgTemp
//     },
//     {
//       name: "Max Temp",
//       value: weather.maxTemp
//     },
//     {
//       name: "Humidity",
//       value: weather.avgHumidity
//     },
//     {
//       name: "Rain %",
//       value: weather.rainProbability
//     }
//   ];

//   return (
//     <div
//       style={{
//         background: "#fff",
//         padding: "20px",
//         borderRadius: "12px",
//         marginBottom: "20px",
//         height: "350px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
//       }}
//     >
//       <h2>Weather Analytics</h2>

//       <ResponsiveContainer
//         width="100%"
//         height="90%"
//       >
//         <BarChart data={data}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="value" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default WeatherChart;