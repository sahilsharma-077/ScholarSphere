import { useState } from "react";

function FollowButton({ currentUserId, targetUserId }) {
  const [following, setFollowing] = useState(false);

  const handleFollow = async () => {
    await fetch(`http://localhost:5000/api/follow/${targetUserId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId: currentUserId })
    });

    setFollowing(true);
  };

  return (
    <button onClick={handleFollow}>
      {following ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
