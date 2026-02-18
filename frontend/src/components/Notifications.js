import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Notifications({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    socket.on("notification", (data) => {
      if (data.userId === userId) {
        setNotifications(prev => [data, ...prev]);
      }
    });

  }, [userId]);

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.map((n, i) => (
        <p key={i}>{n.message}</p>
      ))}
    </div>
  );
}

export default Notifications;
