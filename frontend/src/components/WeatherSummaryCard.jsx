function WeatherSummaryCard({
  title,
  value,
  unit
}) {

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "14px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.08)"
      }}
    >
      <h3
        style={{
          marginBottom: "10px",
          fontSize: "16px"
        }}
      >
        {title}
      </h3>

      <div
        style={{
          fontSize: "30px",
          fontWeight: "bold"
        }}
      >
        {value}
        {unit}
      </div>
    </div>
  );
}

export default WeatherSummaryCard;