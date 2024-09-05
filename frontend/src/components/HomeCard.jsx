import React from 'react';

const HomeCard = ({ home, onEdit }) => {
  return (
    <div className="home-card">
      <h3>{home.home_id}</h3>
      <p>{home.state}</p>
      <button onClick={onEdit}>Edit Users</button>
    </div>
  );
};

export default HomeCard;
