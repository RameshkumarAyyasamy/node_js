const express = require('express');
const bodyParser = require('body-parser');
const buddyController = require('./src/controllers/buddyController');

//Intiating express to the node app and port
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

//The final API methods to operating teh data from user end
app.get('/buddies', buddyController.getAllBuddies);
app.get('/buddies/:id', buddyController.getSingleBuddy);
app.post('/buddies/add', buddyController.addBuddy);
app.put('/buddies/:id/update', buddyController.updateBuddy);
app.delete('/buddies/:id/remove', buddyController.deleteBuddy);

//Creating a server to listen the port.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});