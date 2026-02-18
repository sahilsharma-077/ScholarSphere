import SuggestedUsers from "../components/SuggestedUsers";
function Profile() {

  const currentUserId = "67b4a1f9e2a2c9c1b7b11111";

  return (
    <div>
      <h1>Profile Page</h1>

      {/* user info here */}

      <SuggestedUsers userId={currentUserId} />

    </div>
  );
}

export default Profile;
