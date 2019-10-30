const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
    title: String,
    type: {
        type: String,
        enum: ['activity', 'reminder'],
        default: 'reminder',
        required: true,
    },
    allDayEvt: Boolean,
    opts: {
        time: {
            from: {
                year: String,
                month: String,
                dayAt: String,
                hourAt: String,
                minAt: String,
            }
        },
        repeatOpt: String,
        color: String,
    },
    meta: {
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        updateAt: {
            type: Date,
            default: Date.now(),
        },
    }
});

module.exports = ReminderSchema;
