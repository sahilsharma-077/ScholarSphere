import { useState } from "react";

function SaveButton({ postId, userId }) {
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await fetch(`http://localhost:5000/api/saves/${postId}`, {
      method: saved ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });

    setSaved(!saved);
  };

  return (
    <button onClick={handleSave}>
      {saved ? "Saved" : "Save"}
    </button>
  );
}

export default SaveButton;
