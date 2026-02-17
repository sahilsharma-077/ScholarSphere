import { useState } from "react";

function LikeButton({ postId, userId }) {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    await fetch(`http://localhost:5000/api/likes/${postId}`, {
      method: liked ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });

    setLiked(!liked);
  };

  return (
    <button onClick={handleLike}>
      {liked ? "Liked" : "Like"}
    </button>
  );
}

export default LikeButton;
