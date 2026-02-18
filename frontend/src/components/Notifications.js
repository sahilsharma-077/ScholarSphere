import { useEffect, useState } from "react";

function Notifications({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/notifications/${userId}`)
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.map(n => (
        <p key={n._id}>{n.message}</p>
      ))}
    </div>
  );
}

export default Notifications;
