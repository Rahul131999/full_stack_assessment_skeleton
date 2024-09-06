import React, { useState, useEffect } from 'react';
import { useFindUsersByHomeQuery, useGetUsersQuery } from '../redux/api/usersApiSlice';
import { useUpdateHomeUsersMutation } from '../redux/api/homesApiSlice';
import { useSelector } from "react-redux";

const EditUsersModal = ({ home, onClose }) => {
  const allUsers = useSelector((state) => state.users.users);
  const { data: homeUsers = [], isLoading: isLoadingHomeUsers, isError: isErrorHomeUsers } = useFindUsersByHomeQuery(home.home_id);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [updateHomeUsers] = useUpdateHomeUsersMutation();

  useEffect(() => {
    if (homeUsers.length) {
      setSelectedUsers(homeUsers.map(user => user.user_id));
    }
  }, [homeUsers]);

  const handleToggleUser = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSave = async () => {
    try {
      await updateHomeUsers({ homeId: home.home_id, userIds: selectedUsers }).unwrap();
      window.location.reload()
    } catch (error) {
      console.error('Failed to save users', error);
    }
  };

  const isSaveDisabled = selectedUsers.length === 0;

  // if (isLoading) return <p>Loading users...</p>;
  // if (isError) return <p>Error loading users.</p>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Modify Users for: {home.street_address}</h2>
        <div className="users-list">
          {allUsers.map((user) => (
            <div key={user.user_id} className="user-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.user_id)}
                  onChange={() => handleToggleUser(user.user_id)}
                />
                {user.username}
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
