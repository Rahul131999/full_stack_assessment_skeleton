import React, { useState } from 'react';
import EditUsersModal from './EditUserModal';

const HomeCardContainer = ({ home }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="home-card">
      <h3 className="street-address">{home.street_address}</h3>
      <p>
        <strong>List Price:</strong> ${home.list_price}
      </p>
      <p>
        <strong>State:</strong> {home.state}
      </p>
      <p>
        <strong>ZIP:</strong> {home.zip}
      </p>
      <p>
        <strong>Sqft:</strong> {home.sqft}
      </p>
      <p>
        <strong>Beds:</strong> {home.beds}
      </p>
      <p>
        <strong>Baths:</strong> {home.baths}
      </p>
      <button onClick={() => {setModalOpen(true)} }>Edit Users</button>
      {isModalOpen && (
        <EditUsersModal
          home={home}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HomeCardContainer;
