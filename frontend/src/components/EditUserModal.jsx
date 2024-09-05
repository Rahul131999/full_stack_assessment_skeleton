import React, { useState, useEffect } from 'react';
import { useFindUsersByHomeQuery, useGetUsersQuery } from '../redux/api/usersApiSlice';
import { useUpdateHomeUsersMutation } from '../redux/api/homesApiSlice';

const EditUsersModal = ({ home, onClose }) => {
  const { data: allUsers = [], isLoading, isError } = useGetUsersQuery();
  const { data: homeUsers = [], isLoading: isLoadingHomeUsers, isError: isErrorHomeUsers } = useFindUsersByHomeQuery(home.home_id);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [updateHomeUsers] = useUpdateHomeUsersMutation();


  useEffect(() => {
    if (homeUsers.length) {
      // Set initially checked users based on the users related to the home
      setSelectedUsers(homeUsers.map(user => user.user_id));
    }
  }, [homeUsers]);

  const handleToggleUser = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        // Remove userId from selected users
        return prevSelected.filter((id) => id !== userId);
      } else {
        // Add userId to selected users
        return [...prevSelected, userId];
      }
    });
  };

  const handleSave = async () => {
    try {
      await updateHomeUsers({ homeId: home.home_id, userIds: selectedUsers }).unwrap();
    } catch (error) {
      console.error('Failed to save users', error);
    }
  };

  const isSaveDisabled = selectedUsers.length === 0;

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Users for {home.name}</h2>
        <div className="users-list">
          {allUsers.map((user) => (
            <div key={user.user_id} className="user-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.user_id)}
                  onChange={() => handleToggleUser(user.user_id)}
                />
                {user.email}
              </label>
            </div>
          ))}
        </div>
        {isSaveDisabled && <p className="error-text">At least one user must be selected.</p>}
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} disabled={isSaveDisabled}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUsersModal;
