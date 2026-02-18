import { useState, useEffect } from "react";

function CommentBox({ postId, userId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    const res = await fetch(`http://localhost:5000/api/comments/${postId}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
  loadComments();
}, [postId]);


  const handleComment = async () => {
    await fetch(`http://localhost:5000/api/comments/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, text })
    });

    setText("");
    loadComments(); // refresh comments live
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment"
      />
      <button onClick={handleComment}>Comment</button>

      {comments.map(c => (
        <p key={c._id}>{c.text}</p>
      ))}
    </div>
  );
}

export default CommentBox;
