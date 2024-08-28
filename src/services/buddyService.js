const fs = require('fs');
const logger = require('../../logger');
const buddiesFilePath = './src/constants/cdw_ace23_buddies.json';

//Create a Json file if it's not exist
if (!fs.existsSync(buddiesFilePath)) {
  fs.writeFileSync(buddiesFilePath, JSON.stringify([]));
  logger.info(`Created new file: ${buddiesFilePath}`);
}

//Reading Buddies Data from Json file
const readBuddiesFromFile = (id) => {
  try {
    const rawData = fs.readFileSync(buddiesFilePath);
    logger.info(`Fetching buddies`);
    return JSON.parse(rawData);
  } catch (err) {
    logger.warn(`Buddy not found`);
    res.status(404).json({ message: 'Buddy not found' });
  }
};

//Write buddies data in the created Json file
const writeBuddiesToFile = (buddies) => {
  fs.writeFileSync(buddiesFilePath, JSON.stringify(buddies, null, 2));
  logger.info('Buddy data Added successfully in file.');
};

//Get all the buddy details available in the Json file
exports.getAllBuddies = () => {
  return readBuddiesFromFile();
};

//Get a particular buddy detai from the Json file
exports.getSingleBuddy = (id) => {
  const buddies = readBuddiesFromFile(id);
  return buddies.find(b => b.employeeId === parseInt(id) || b.realName === id);
};

//Add new Buddy to the buddies json
exports.addBuddy = (newBuddy) => {
  const buddies = readBuddiesFromFile();
  const sortedBuddies = buddies.sort((a, b) => a.employeeId - b.employeeId);
  const buddyLength = Object.keys(buddies).length;
  if(buddyLength>0){
  newBuddy.employeeId = sortedBuddies[buddyLength-1].employeeId+1;
  }
  else
  newBuddy.employeeId = 1001;

  buddies.push(newBuddy);
  writeBuddiesToFile(buddies);
  return { message: 'Buddy added successfully' };
};

//Updating existing buddy details in json 
exports.updateBuddy = (id,updateData) => {
  const buddies = readBuddiesFromFile(id);
  const index = buddies?.findIndex(b => b?.employeeId === parseInt(id) || b?.realName === id);
  if (index !== -1) {
    buddies[index] = { ...buddies[index], ...updateData };
    writeBuddiesToFile(buddies);
    logger.info(`Buddy updated successfully: ${JSON.stringify(buddies[index])}`);
    return { message: 'Buddy updated successfully' };
  } else {
    logger.warn(`Buddy not found with employeeId: ${employeeId}`);
    return { error: 'Buddy not found' };
  }
};

//Get a particular buddy detai from the Json file
exports.deleteBuddy = (id) => {
  const buddies = readBuddiesFromFile(id);
  const index = buddies?.findIndex(b => b?.employeeId === parseInt(id) || b?.realName === id);
  if (index !== -1) {
    buddies.splice(index, 1);
    writeBuddiesToFile(buddies);
    logger.info(`Buddy deleted successfully with employeeId: ${id}`);
    return { message: 'Buddy deleted successfully' };
  } else {
    logger.warn(`Buddy not found with employeeId: ${id}`);
    return { error: 'Buddy not found' };
  }
};