import React from "react";

interface UserSelectorProps {
  users: string[];
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>; // State setter for selectedUser
}

const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  return (
    <select
      className="select select-bordered w-full"
      value={selectedUser}
      onChange={(e) => setSelectedUser(e.target.value)}
    >
      <option value="">All Users</option>
      {users.map((user) => (
        <option key={user} value={user}>
          {user}
        </option>
      ))}
    </select>
  );
};

export default UserSelector;
