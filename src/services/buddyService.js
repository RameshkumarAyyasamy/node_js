const fs = require('fs');
const buddiesFilePath = './src/constants/cdw_ace23_buddies.json';

//Create a Json file if it's not exist
if (!fs.existsSync(buddiesFilePath)) {
  fs.writeFileSync(buddiesFilePath, JSON.stringify([]));
  console.log(`Created new file: ${buddiesFilePath}`);
}

//Reading Buddies Data from Json file
const readBuddiesFromFile = () => {
  try {
    const rawData = fs.readFileSync(buddiesFilePath);
    return JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading or writing file:', err);
  }
};

//Write buddies data in the created Json file
const writeBuddiesToFile = (buddies) => {
  fs.writeFileSync(buddiesFilePath, JSON.stringify(buddies, null, 2));
};

//Get all the buddy details available in the Json file
exports.getAllBuddies = () => {
  return readBuddiesFromFile();
};

//Get a particular buddy detai from the Json file
exports.getSingleBuddy = (id) => {
  const buddies = readBuddiesFromFile();
  return buddies.find(b => b.employeeId === parseInt(id) || b.realName === id);
};

//Add new Buddy to the buddies json
exports.addBuddy = (newBuddy) => {
  const buddies = readBuddiesFromFile();
  const sortedBuddies = buddies.sort((a, b) => a.employeeId - b.employeeId);
  const buddyLength = Object.keys(buddies).length;
  if(buddyLength>0){
    console.log('line37',sortedBuddies[buddyLength-1])
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
  const buddies = readBuddiesFromFile();
  const index = buddies?.findIndex(b => b?.employeeId === parseInt(id) || b?.realName === id);
  if (index !== -1) {
    buddies[index] = { ...buddies[index], ...updateData };
    writeBuddiesToFile(buddies);
    return { message: 'Buddy updated successfully' };
  } else {
    return { error: 'Buddy not found' };
  }
};

//Get a particular buddy detai from the Json file
exports.deleteBuddy = (id) => {
  const buddies = readBuddiesFromFile();
  const index = buddies?.findIndex(b => b?.employeeId === parseInt(id) || b?.realName === id);
  if (index !== -1) {
    buddies.splice(index, 1);
    writeBuddiesToFile(buddies);
    return { message: 'Buddy deleted successfully' };
  } else {
    return { error: 'Buddy not found' };
  }
};
