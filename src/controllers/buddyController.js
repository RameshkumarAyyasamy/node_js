const buddyService = require('../services/buddyService');


//The methods to accessing buddy details (Get all, Get one buddy, Add buddy, update Buddy, delete buddy) with the error codes.
exports.getAllBuddies = (req, res) => {
  const buddies = buddyService.getAllBuddies();
  res.json(buddies);
};

exports.getSingleBuddy = (req, res) => {
  const id = req.params.id;
  const buddy = buddyService.getSingleBuddy(id);
  if (buddy) {
    res.json(buddy);
  } else {
    res.status(404).json({ message: 'Buddy not found' });
  }
};

exports.addBuddy = (req, res) => {
  const newBuddy = req.body;
  const result = buddyService.addBuddy(newBuddy);
  if (!newBuddy?.realName || !newBuddy?.nickName || !newBuddy?.dob || !newBuddy?.hobbies) {
    return res.status(400).json('Buddy must have a realName, nickName, dob, and hobbies');
  }
  else {
  res.json(result);
  }
};

exports.updateBuddy = (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  if (updateData.hasOwnProperty("employeeId")) {
    return res.status(400).json('Cannot update emplyee id');
  }
  const result = buddyService.updateBuddy(id, updateData);
  res.json(result);
};

exports.deleteBuddy = (req, res) => { 
  const id = req.params.id;
  const result = buddyService.deleteBuddy(id);
  res.json(result);
};