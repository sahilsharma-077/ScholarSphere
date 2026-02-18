const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Message = require('./models/Message');

const http = require('http');
const { Server } = require('socket.io');

/* CREATE EXPRESS APP FIRST */
const app = express();

/* CONNECT DB */
connectDB();

app.use(cors());
app.use(express.json());
const notificationRoutes = require('./routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const repostRoutes = require('./routes/repostRoutes');
app.use('/api/reposts', repostRoutes);

const shareRoutes = require('./routes/shareRoutes');
app.use('/api/shares', shareRoutes);

const commentRoutes = require('./routes/commentRoutes');
app.use('/api/comments', commentRoutes);

const saveRoutes = require('./routes/saveRoutes');
app.use('/api/saves', saveRoutes);

const likeRoutes = require('./routes/likeRoutes');
app.use('/api/likes', likeRoutes);

const feedRoutes = require('./routes/feedRoutes');
app.use('/api/feed', feedRoutes);

/* CREATE HTTP SERVER AFTER app */
const server = http.createServer(app);

/* SOCKET SERVER */
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket) => {
  console.log("User connected:", socket.id);

socket.on('send_message', async (data) => {
  try {
    const message = new Message({
      senderId: data.senderId,
      receiverId: data.receiverId,
      text: data.text
    });

    await message.save();

    io.emit('receive_message', message);
  } catch (err) {
    console.error(err);
  }
});


  socket.on('disconnect', () => {
    console.log("User disconnected:", socket.id);
  });
});

/* ROUTES */
const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send("ScholarSphere API Running");
});

/* START SERVER */
server.listen(5000, () => {
  console.log("Server running on port 5000");
});
