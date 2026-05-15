function FarmerCard({
  farmer,
  onClick
}) {

  return (

    <div
      className="farmer-card"
      onClick={onClick}
    >

      <h3>
        {farmer.name}
      </h3>

      <p>
        📍 {farmer.location}
      </p>

      <p>
        🌱 {farmer.crop}
      </p>

      <p>
        🚜 {farmer.stage}
      </p>

    </div>
  );
}

export default FarmerCard;