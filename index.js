const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // HTTP request logging middleware
const fs = require('fs');
require('dotenv').config();  // Load environment variables
const logger = require('./logger'); 
const bodyParser = require('body-parser');
const buddyRoutes = require('./src/routes/route');

//Intiating express to the node app and port
const app = express();
const PORT = process.env.PORT || 3009;
app.use(morgan('combined', { stream: fs.createWriteStream('logs/access.log', { flags: 'a' }) })); // Write requests to access.log
app.use(morgan('dev')); 

const corsOptions = {
  origin: [ 'http://localhost:3000'], 
  methods: ['GET', 'POST', 'PUT'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/buddies', buddyRoutes);

//Creating a server to listen the port.
app.listen(PORT, () => {
  logger?.info(`Server is running on http://localhost:${PORT}`);
});
