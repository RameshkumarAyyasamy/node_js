const express = require('express');

const buddyController = require('../controllers/buddyController');

const router = express.Router();
console.log("line:6");
router.get('/', buddyController.getAllBuddies);
router.get('/:id', buddyController.getSingleBuddy);
router.post('/add', buddyController.addBuddy);
router.put('/:id/update', buddyController.updateBuddy);
router.delete('/:id/remove', buddyController.deleteBuddy);

module.exports = router;