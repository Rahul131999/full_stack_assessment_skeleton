import React, { useState } from 'react';
import HomeCard from './HomeCard';
import EditUsersModal from './EditUserModal';

const HomeCardContainer = ({ home }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="home-card-container">
      <HomeCard home={home} onEdit={() => setModalOpen(true)} />
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
