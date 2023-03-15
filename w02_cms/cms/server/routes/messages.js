const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    Message.find()
        .then(messages => {
            res.status(200).json({
                messageInfo: "Message fetched successfully",
                messages: messages
            });
        })
        .catch(error => {
            res.status(500).json({
                messageInfo: 'An error occurred',
                error: error
            });
        });
});

router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");

    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        // sender: req.body.sender
        sender: "6411150b8eecdb5cfdc2e998"
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                messageInfo: 'Message added successfully',
                message: createdMessage
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500)
            .json({
                messageInfo: 'An error occurred',
                error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            message.subject = req.body.subject;
            message.msgText = req.body.msgText;
            message.sender = req.body.sender;

            Message.updateOne({ id: req.params.id }, message)
                .then(result => {
                    res.status(204).json({
                        messageInfo: 'Message updated successfully'
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        messageInfo: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                messageInfo: 'Message not found.',
                error: { messageInfo: 'Message not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            Message.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        messageInfo: "Message deleted successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        messageInfo: 'An error occurred',
                        error: error
                    });
                })
        })
        .catch(error => {
            res.status(500).json({
                messageInfo: 'Message not found.',
                error: { messageInfo: 'Message not found' }
            });
        });
});

module.exports = router;
