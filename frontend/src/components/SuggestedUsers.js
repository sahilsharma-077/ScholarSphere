import { useEffect, useState } from "react";

function SuggestedUsers({ userId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/suggested/${userId}`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h3>Suggested Users</h3>
      {users.map(u => (
        <p key={u._id}>{u.name}</p>
      ))}
    </div>
  );
}

export default SuggestedUsers;
