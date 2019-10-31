const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    title: String,
    type: {
        type: String,
        enum: ['activity', 'reminder'],
        default: 'activity',
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
            },
            to: {
                year: String,
                month: String,
                dayAt: String,
                hourAt: String,
                minAt: String,
            },
        },
        address: String,
        description: String,
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

ActivitySchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});

module.exports = ActivitySchema;
