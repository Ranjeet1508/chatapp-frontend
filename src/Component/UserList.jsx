import React from 'react';

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user._id} onClick={() => onSelectUser(user._id)}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;



