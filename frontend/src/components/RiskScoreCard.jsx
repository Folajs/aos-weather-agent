function RiskScoreCard({ score, level }) {

  const getColor = () => {

    if (level === "Low") {
      return "#16a34a";
    }

    if (level === "Medium") {
      return "#eab308";
    }

    if (level === "High") {
      return "#f97316";
    }

    if (level === "Critical") {
      return "#dc2626";
    }

    return "#6b7280";
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h2>Risk Assessment</h2>

      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: getColor()
        }}
      >
        {score}
      </div>

      <p
        style={{
          color: getColor(),
          fontWeight: "bold"
        }}
      >
        {level} Risk
      </p>
    </div>
  );
}

export default RiskScoreCard;