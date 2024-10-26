import React from 'react';
import './ParticleBackground.css';

const StarBackground = () => {
  const generateStars = (amount) => {
    const stars = [];
    for (let i = 0; i < amount; i++) {
      const size = Math.random() * 3 + 1; // Random size between 1 and 4
      const top = Math.random() * 90 + 'vh'; // Random top position
      const left = Math.random() * 100 + 'vw'; // Random left position
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            width: size,
            height: size,
            top: top,
            left: left,
          }}
        />
      );
    }
    return stars;
  };

  const createShootingStar = () => {
    const top = Math.random() * 90 + 'vh'; // Random top position
    const left = Math.random() * 100 + 'vw'; // Random left position
    return (
      <div
        key="shooting-star"
        className="shooting-star"
        style={{
          top: top,
          left: left,
          animationDuration: '5s', // Random duration between 2s and 5s
          animationDelay: Math.random() * 5 + 's', // Random delay
        }}
      />
    );
  };

  return (
    <div className="star-background">
      {generateStars(100)}
      {createShootingStar()}
    </div>
  );
};

export default StarBackground;