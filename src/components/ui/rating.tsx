import React, { useState } from "react";

interface RatingProps {
  value?: number;
  size?: "small" | "medium" | "large";
  onChange?: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  value = 0,
  size = "medium",
  onChange,
}) => {
  const [hover, setHover] = useState<number>(0);
  const isInteractive = !!onChange;

  const sizeClass =
    size === "small" ? "fs-6" : size === "large" ? "fs-4" : "fs-5";

  const renderStar = (index: number) => {
    const rating = isInteractive ? hover || value : value;
    const isFilled = index <= rating;

    const roundedRating = Math.round(rating * 2) / 2; // nearest 0.5
    const isHalf =
      !isInteractive &&
      roundedRating % 1 === 0.5 &&
      index === Math.ceil(roundedRating);

    return (
      <i
        key={index}
        className={`bi ${
          isHalf ? "bi-star-half" : isFilled ? "bi-star-fill" : "bi-star"
        } ${isFilled || isHalf ? "text-warning" : "text-muted"} me-1 ${sizeClass}`}
        onMouseEnter={() => isInteractive && setHover(index)}
        onMouseLeave={() => isInteractive && setHover(0)}
        onClick={() => isInteractive && onChange?.(index)}
      ></i>
    );
  };

  return (
    <div className="d-flex align-items-center">
      <div className="d-flex">{[1, 2, 3, 4, 5].map(renderStar)}</div>
    </div>
  );
};

export default Rating;
