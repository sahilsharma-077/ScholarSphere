import Notifications from "../components/Notifications";

import SuggestedUsers from "../components/SuggestedUsers";

import RepostButton from "../components/RepostButton";
import CommentBox from "../components/CommentBox";
import ShareButton from "../components/ShareButton";
import SaveButton from "../components/SaveButton";
import FollowButton from "../components/FollowButton";
import LikeButton from "../components/LikeButton";
import { useEffect, useState } from "react";

function Feed() {
  const [posts, setPosts] = useState([]);

  const currentUserId = "67b4a1f9e2a2c9c1b7b11111";
  

  useEffect(() => {
    fetch(`http://localhost:5000/api/feed/${currentUserId}`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>ScholarSphere Feed</h1>
      <Notifications userId={currentUserId} />


      

      {posts.map(post => (
        <div key={post._id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>
          <div style={{marginTop: "30px"}}>
  <SuggestedUsers userId={currentUserId} />
</div>

          <FollowButton
      currentUserId={currentUserId}
      targetUserId={post.userId}
    />
          <p>{post.content}</p>
          <small>{new Date(post.createdAt).toLocaleString()}</small>

          <LikeButton
            postId={post._id}
            userId={currentUserId}
          />
<CommentBox
  postId={post._id}
  userId={currentUserId}
/>
<RepostButton
  postId={post._id}
  userId={currentUserId}
/>

<ShareButton
  postId={post._id}
  userId={currentUserId}
/>


          <SaveButton
            postId={post._id}
            userId={currentUserId}
          />
        </div>
      ))}
    </div>
  );
}

export default Feed;
