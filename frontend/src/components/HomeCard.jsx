import React from 'react';

const HomeCard = ({ home }) => {
  return (
    <div className="home-card">
      <h3>{home.home_id}</h3>
      <p>{home.state}</p>
    </div>
  );
};

export default HomeCard;
