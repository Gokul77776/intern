const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const certificateRoute = require('./routes/certificate');


 


const app = express();

// Connect to MongoDB
connectDB();

// Middleware

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
 
// Routes
app.use('/api', require('./routes/register'));
app.use('/api', certificateRoute);


const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
