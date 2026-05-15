import {
  useEffect,
  useState
} from "react";

import Login
from "./pages/Login";

import RiskScoreCard
from "./components/RiskScoreCard";

import WeatherChart
from "./components/WeatherChart";

import RecommendationCard
from "./components/RecommendationCard";

import FarmerProfileCard
from "./components/FarmerProfileCard";

import WeatherSummaryCard
from "./components/WeatherSummaryCard";


function App() {

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  const [farmers, setFarmers] =
    useState([]);

  const [selectedFarmer, setSelectedFarmer] =
    useState(1);

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);



  // LOAD FARMERS
  useEffect(() => {

    if (!token) return;

    fetch(
      "http://localhost:3000/api/v1/farmers",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {

        setFarmers(data.farmers);
      });

  }, [token]);



  // LOAD ADVICE
  useEffect(() => {

    if (!token) return;

    async function fetchAdvice() {

      setLoading(true);

      const response =
        await fetch(
          `http://localhost:3000/api/v1/multi-day-advice/${selectedFarmer}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const result =
        await response.json();

      setData(result);

      setLoading(false);
    }

    fetchAdvice();

  }, [selectedFarmer, token]);



  function logout() {

    localStorage.removeItem(
      "token"
    );

    setToken(null);
  }



  if (!token) {

    return (
      <Login
        onLogin={setToken}
      />
    );
  }


  return (
    <div
      style={{
        padding: "30px",
        background: "#f3f4f6",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "24px"
        }}
      >
        <h1>
          AI Weather Advisory Dashboard
        </h1>

        <button
          onClick={logout}
          style={{
            padding: "10px 16px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>


      {/* FARMER SELECT */}
      <div
        style={{
          marginBottom: "24px"
        }}
      >
        <select
          value={selectedFarmer}
          onChange={(e) =>
            setSelectedFarmer(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            borderRadius: "8px",
            minWidth: "250px"
          }}
        >
          {farmers.map((farmer) => (

            <option
              key={farmer.id}
              value={farmer.id}
            >
              {farmer.name}
              {" — "}
              {farmer.location}
            </option>
          ))}
        </select>
      </div>


      {loading && (
        <h2>Loading dashboard...</h2>
      )}


      {data && (

        <>
          {/* FARMER PROFILE */}
          <FarmerProfileCard
            farmer={data.farmer}
          />


          {/* RISK */}
          <RiskScoreCard
            score={
              data.advice.riskScore
            }
            level={
              data.advice.riskLevel
            }
          />


          {/* WEATHER SUMMARY */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
              marginBottom: "24px"
            }}
          >
            <WeatherSummaryCard
              title="Average Temp"
              value={
                data.weather.avgTemp
              }
              unit="°C"
            />

            <WeatherSummaryCard
              title="Max Temp"
              value={
                data.weather.maxTemp
              }
              unit="°C"
            />

            <WeatherSummaryCard
              title="Humidity"
              value={
                data.weather.avgHumidity
              }
              unit="%"
            />

            <WeatherSummaryCard
              title="Rainfall"
              value={
                data.weather.totalRainfall
              }
              unit="mm"
            />
          </div>


          {/* CHART */}
          <WeatherChart
            weather={data.weather}
          />


          {/* RECOMMENDATIONS */}
          <div
            style={{
              marginTop: "24px"
            }}
          >
            <h2
              style={{
                marginBottom: "16px"
              }}
            >
              AI Recommendations
            </h2>

            {data.advice.recommendations.map(
              (item, index) => (

                <RecommendationCard
                  key={index}
                  item={item}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
// import { useEffect, useState } from "react";

// import RiskScoreCard
// from "./components/RiskScoreCard";

// import WeatherChart
// from "./components/WeatherChart";

// import RecommendationCard
// from "./components/RecommendationCard";

// function App() {

//   const [farmers, setFarmers] =
//     useState([]);

//   const [selectedFarmer, setSelectedFarmer] =
//     useState(1);

//   const [data, setData] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(false);

//   const [error, setError] =
//     useState("");



//   // LOAD FARMERS
//   useEffect(() => {

//     fetch(
//       "http://localhost:3000/api/v1/farmers"
//     )
//       .then((res) => res.json())
//       .then((data) => {

//         setFarmers(data.farmers);
//       });

//   }, []);



//   // LOAD ADVICE
//   useEffect(() => {

//     async function fetchAdvice() {

//       try {

//         setLoading(true);

//         setError("");

//         const response = await fetch(
//           `http://localhost:3000/api/v1/multi-day-advice/${selectedFarmer}`
//         );

//         const result =
//           await response.json();

//         setData(result);

//       } catch (err) {

//         setError(
//           "Failed to load advisory data."
//         );

//       } finally {

//         setLoading(false);
//       }
//     }

//     fetchAdvice();

//   }, [selectedFarmer]);


//   return (
//     <div
//       style={{
//         padding: "30px",
//         background: "#f3f4f6",
//         minHeight: "100vh",
//         fontFamily: "Arial"
//       }}
//     >
//       <h1>
//         AI Weather Advisory Dashboard
//       </h1>


//       {/* FARMER SELECT */}
//       <div
//         style={{
//           marginBottom: "20px"
//         }}
//       >
//         <select
//           value={selectedFarmer}
//           onChange={(e) =>
//             setSelectedFarmer(
//               e.target.value
//             )
//           }
//           style={{
//             padding: "12px",
//             fontSize: "16px",
//             borderRadius: "8px"
//           }}
//         >
//           {farmers.map((farmer) => (

//             <option
//               key={farmer.id}
//               value={farmer.id}
//             >
//               {farmer.name} — {farmer.crop}
//             </option>
//           ))}
//         </select>
//       </div>


//       {loading && <h2>Loading...</h2>}

//       {error && (
//         <h2 style={{ color: "red" }}>
//           {error}
//         </h2>
//       )}


//       {data && (

//         <>
//           <RiskScoreCard
//             score={
//               data.advice.riskScore
//             }
//             level={
//               data.advice.riskLevel
//             }
//           />

//           <WeatherChart
//             weather={data.weather}
//           />

//           <h2>
//             AI Recommendations
//           </h2>

//           {data.advice.recommendations.map(
//             (item, index) => (

//               <RecommendationCard
//                 key={index}
//                 item={item}
//               />
//             )
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
