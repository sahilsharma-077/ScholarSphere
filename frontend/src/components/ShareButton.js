function ShareButton({ postId, userId }) {

  const handleShare = async () => {

    /* record share in backend */
    await fetch(`http://localhost:5000/api/shares/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });

    /* copy link */
    const link = `${window.location.origin}/post/${postId}`;
    await navigator.clipboard.writeText(link);

    alert("Post shared!");
  };

  return (
    <button onClick={handleShare}>
      Share
    </button>
  );
}

export default ShareButton;
