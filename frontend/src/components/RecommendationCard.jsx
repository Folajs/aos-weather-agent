function RecommendationCard({ item }) {

  const getColor = () => {

    switch (item.level) {

      case "good":
        return "#16a34a";

      case "info":
        return "#2563eb";

      case "warning":
        return "#f59e0b";

      case "danger":
        return "#dc2626";

      default:
        return "#6b7280";
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "16px",
        borderLeft: `8px solid ${getColor()}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h3>{item.title}</h3>

      <p>
        <strong>Type:</strong> {item.type}
      </p>

      <p>{item.message}</p>

      <p>
        <strong>Action:</strong> {item.action}
      </p>
    </div>
  );
}

export default RecommendationCard;