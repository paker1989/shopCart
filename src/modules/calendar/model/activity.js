const mongoose = require('mongoose');
const ActivitySchema = require('../schema/activitySchema');

module.exports = mongoose.model('Activity', ActivitySchema);
