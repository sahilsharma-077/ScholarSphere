const feedRoutes = require('./routes/feedRoutes');

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const followRoutes = require('./routes/followRoutes');

const app = express();

connectDB();

app.use('/api/feed', feedRoutes);

app.use(cors());
app.use(express.json());

app.use('/api/follow', followRoutes);

app.get('/', (req, res) => {
  res.send("ScholarSphere API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
