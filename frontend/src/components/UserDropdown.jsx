import React from 'react';
import { useGetUsersQuery } from '../redux/api/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/usersSlice';

const UserDropdown = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const { data: users = [], isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <select
      value={selectedUser || ''}
      onChange={(e) => dispatch(selectUser(e.target.value))}
    >
      <option value="">Select a user</option>
      {users.map((user) => (
        <option key={user.user_id} value={user.user_id}>
          {user.email}
        </option>
      ))}
    </select>
  );
};

export default UserDropdown;
