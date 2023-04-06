const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Connect to MongoDB
const uri = 'mongodb+srv://20bcs092:20bcs092Attendence@cluster0.woxiouc.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.log('Error connecting to MongoDB Atlas: ', error);
});

// Use body-parser middleware
app.use(express.json());

// Use student routes
app.use('/students', studentRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ message: 'Internal server error' });
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
