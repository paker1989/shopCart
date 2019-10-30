const express = require('express');
const router = express.Router();
const Activity = require('../model/activity');
const Reminder = require('../model/reminder');

function handleError(err, res) {
    if (err) {
        res.send({ err });
    }
}

// const getTags = (req, res) => {
//     const userId = req.body.userId;
//     // to handle userId
//     Tag.find({}, (err, tags) => {
//         if (err) {
//             handleError(err, res);
//         } else {
//             res.send({ tags });
//         }
//     });
// };

// /**
//  * @param {*} req
//  * @param {*} res
//  * @return { err | tag}
//  */
// const addTag = (req, res) => {
//     const userId = req.body.userId;
//     const tagName = req.body.tag;
//     const newTag = new Tag({
//         name: tagName,
//     });
//     newTag.save((err, tag) => {
//         if (err) {
//             handleError(err, res);
//         } else {
//             res.send({ tag });
//         }
//     });
// };

// /**
//  * @param {*} req
//  * @param {*} res
//  */
// const deleteTag = (req, res) => {
//     Tag.findById(req.body.tagId, (err, tag) => {
//         tag.remove(err => {
//             if (err) return handleError(err, res);
//             res.send({ isDeleted: true });
//         });
//     });
// };
const saveEvent = (req, res) => {
  
}

router.post('/saveEvent', saveEvent);

module.exports = router;
