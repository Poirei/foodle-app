import React from "react";
import "./food-card.styles.scss";

const Food = ({ food }) => {
  return (
    <div className="movie">
      <h2>{food.title}</h2>
      <div>
        <img src={food.image} alt={`The movie titled: ${food.title}`} />
      </div>
    </div>
  );
};

export default Food;
