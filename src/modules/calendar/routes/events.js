const express = require('express');
const router = express.Router();

const Activity = require('../model/activity');
const Reminder = require('../model/reminder');

function handleError(err, next) {
    if (err) {
        // res.status(500).send('fail to parse req body + ' + JSON.stringify(err));
        next(err);
    }
}

const saveEvent = (req, res, next) => {
    try {
        let evt = req.body.params.evt;
        if (evt) {
            if (evt._id) {
                updateEvent(evt, err => {
                    if (err) {
                        handleError(err, next);
                    } else {
                        res.status(200).send({ event: item });
                    }
                });
            } else {
                switch (evt.type) {
                    case 'activity':
                        Activity.create(evt, (err, activity) => {
                            if (err) {
                                handleError(err, next);
                            } else {
                                Activity.findById(activity._id)
                                    .select('-meta')
                                    .exec((err, item) => {
                                        res.status(200).send({ event: item });
                                    });
                            }
                        });
                        break;
                    case 'reminder':
                        Reminder.create(evt, (err, reminder) => {
                            if (err) {
                                handleError(err, next);
                            } else {
                                Reminder.findById(reminder._id)
                                    .select('-meta')
                                    .exec((err, item) => {
                                        res.status(200).send({ event: item });
                                    });
                            }
                        });
                        break;
                }
            }
        }
    } catch (err) {
        handleError(err);
    }
};

/**
 * need to consider type change
 * @param {*} evt
 * @param {*} cb
 */
const updateEvent = (evt, cb) => {
    // to do
};

const getDayEvents = (req, res, next) => {
    try {
        const dateKey = req.body.params.dateKey;
        const dateKeyArray = dateKey.split('');

        const year = parseInt(dateKeyArray.slice(0, 4).join(''));
        const month = parseInt(dateKeyArray.slice(4, 6).join(''));
        const dayAt = parseInt(dateKeyArray.slice(6, 8).join(''));

        Promise.all([
            Activity.find({
                'opts.time.from.year': year,
                'opts.time.from.month': month,
                'opts.time.from.dayAt': dayAt,
            }).select('-meta'),
            Reminder.find({
                'opts.time.year': year,
                'opts.time.month': month,
                'opts.time.dayAt': dayAt,
            }).select('-meta'),
        ]).then(([activities, reminders]) => {
            const evts = activities.concat(reminders);
            res.status(200).send({ evts });
        });
    } catch (err) {
        handleError(err, next);
    }
};

const getWeekEvents = (req, res, next) => {
    try {
        const dateKeys = req.body.params.dateKeys;
        let dateKeyArray;
        let year;
        let month;
        let dayAt;

        Promise.all([
            Activity.find({
                $or: [
                    ...dateKeys.map(dateKey => {
                        dateKeyArray = dateKey.split('');
                        year = parseInt(dateKeyArray.slice(0, 4).join(''));
                        month = parseInt(dateKeyArray.slice(4, 6).join(''));
                        dayAt = parseInt(dateKeyArray.slice(6, 8).join(''));
                        return {
                            'opts.time.from.year': year,
                            'opts.time.from.month': month,
                            'opts.time.from.dayAt': dayAt,
                        };
                    }),
                ],
            }).select('-meta'),
            Reminder.find({
                $or: [
                    ...dateKeys.map(dateKey => {
                        dateKeyArray = dateKey.split('');
                        year = parseInt(dateKeyArray.slice(0, 4).join(''));
                        month = parseInt(dateKeyArray.slice(4, 6).join(''));
                        dayAt = parseInt(dateKeyArray.slice(6, 8).join(''));
                        return {
                            'opts.time.from.year': year,
                            'opts.time.from.month': month,
                            'opts.time.from.dayAt': dayAt,
                        };
                    }),
                ],
            }).select('-meta'),
        ]).then(([activities, reminders]) => {
            const evts = activities.concat(reminders);
            res.status(200).send({ evts });
        });
    } catch (err) {
        handleError(err, next);
    }
};

const getMonthEvents = (req, res, next) => {
    try {
        const { year, month } = req.body.params;
        Promise.all([
            Activity.find({
                'opts.time.from.year': parseInt(year),
                'opts.time.from.month': parseInt(month),
            }).select('-meta'),
            Reminder.find({
                'opts.time.year': year,
                'opts.time.month': month,
            }).select('-meta'),
        ]).then(([activities, reminders]) => {
            const evts = activities.concat(reminders);
            res.status(200).send({ evts });
        });
    } catch (err) {
        handleError(err, next);
    }
};

router.post('/saveEvent', saveEvent);
router.post('/getDayEvents', getDayEvents);
router.post('/getWeekEvents', getWeekEvents);
router.post('/getMonthEvents', getMonthEvents);

module.exports = router;
