const express = require('express');
const bodyParser = require('body-parser');
const buddyRoutes = require('./src/routes/route');

//Intiating express to the node app and port
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/buddies', buddyRoutes);

//Creating a server to listen the port.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});