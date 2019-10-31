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
            year: String,
            month: String,
            dayAt: String,
            hourAt: String,
            minAt: String,
        },
        repeatOption: String,
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


ReminderSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});


module.exports = ReminderSchema;
