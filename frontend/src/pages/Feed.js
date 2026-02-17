import FollowButton from "../components/FollowButton";
import { useEffect, useState } from "react";

function Feed() {
  const [posts, setPosts] = useState([]);

  const currentUserId = "67b4a1f9e2a2c9c1b7b11111";
  const targetUserId = "69944e8695f20758c67c2907"; // replace with real user id

  useEffect(() => {
    fetch(`http://localhost:5000/api/feed/${currentUserId}`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>ScholarSphere Feed</h1>

      {/* Follow button test */}
      <FollowButton
        currentUserId={currentUserId}
        targetUserId={targetUserId}
      />

      {posts.map(post => (
        <div key={post._id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>
          <p>{post.content}</p>
          <small>{new Date(post.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default Feed;
