import React, { useEffect } from "react";
import { useGetUsersQuery } from "../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUsers } from "../redux/slices/usersSlice";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const { data: users = [], isLoading, isError } = useGetUsersQuery();

  useEffect(() => {
    if (users.length) {
      dispatch(setUsers(users));
    }
  }, [users])

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <select
      value={selectedUser || ""}
      onChange={(e) => dispatch(selectUser(e.target.value))}
    >
      <option value="">Select a user</option>
      {users.map((user) => (
        <option key={user.user_id} value={user.user_id}>
          {user.username}
        </option>
      ))}
    </select>
  );
};

export default UserDropdown;
