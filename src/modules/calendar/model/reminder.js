const mongoose = require('mongoose');
const ReminderSchema = require('../schema/reminderSchema');

module.exports = mongoose.model('Reminder', ReminderSchema);
