import { useEffect, useState } from "react";
import FollowButton from "./FollowButton";

function SuggestedUsers({ userId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
   fetch(`http://localhost:5000/api/users/suggested/${userId}`)
     .then(res => res.json())
     .then(data => setUsers(data));
}, [userId]);


  return (
    <div>
      <h3>Suggested Users</h3>

      {users.map(u => (
        <div key={u._id} style={{ marginBottom: "10px" }}>
          <span>{u.name}</span>

          {/* Follow button added here */}
          <FollowButton
            currentUserId={userId}
            targetUserId={u._id}
          />
        </div>
      ))}
    </div>
  );
}

export default SuggestedUsers;

