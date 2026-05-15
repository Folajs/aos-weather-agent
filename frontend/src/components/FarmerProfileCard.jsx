function FarmerProfileCard({ farmer }) {

  if (!farmer) {
    return null;
  }

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "24px",
        borderRadius: "14px",
        marginBottom: "20px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.08)"
      }}
    >
      <h2
        style={{
          marginBottom: "16px"
        }}
      >
        Farmer Profile
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px"
        }}
      >
        <div>
          <strong>Name:</strong>
          <p>{farmer.name}</p>
        </div>

        <div>
          <strong>Location:</strong>
          <p>{farmer.location}</p>
        </div>

        <div>
          <strong>Crop:</strong>
          <p>{farmer.crop}</p>
        </div>

        <div>
          <strong>Growth Stage:</strong>
          <p>{farmer.stage}</p>
        </div>

        <div>
          <strong>Farm Size:</strong>
          <p>{farmer.farmSize}</p>
        </div>

        <div>
          <strong>Phone:</strong>
          <p>{farmer.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default FarmerProfileCard;