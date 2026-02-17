function RepostButton({ postId, userId }) {

  const handleRepost = async () => {
    await fetch(`http://localhost:5000/api/reposts/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });

    alert("Reposted!");
  };

  return (
    <button onClick={handleRepost}>
      Repost
    </button>
  );
}

export default RepostButton;
