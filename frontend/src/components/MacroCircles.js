export default function MacroCircles({ protein = 0, carbs = 0, fats = 0 }) {
  const circleStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
    margin: "10px",
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      <div
        style={{
          ...circleStyle,
          backgroundColor: "#ff6b6b",
        }}
      >
        Protein: {protein}g
      </div>
      <div
        style={{
          ...circleStyle,
          backgroundColor: "#4ecdc4",
        }}
      >
        Carbs: {carbs}g
      </div>
      <div
        style={{
          ...circleStyle,
          backgroundColor: "#45b7d1",
        }}
      >
        Fats: {fats}g
      </div>
    </div>
  );
}
