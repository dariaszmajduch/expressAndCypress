const fs = require('fs');
const handlers = require('../handlers');

const messagesFilePath = './data/messages.json';

const fileNotExistingError = 'File ./data/messages.json does not exist';
const messageNotExistingError = 'Message with this id does not exist';
const modifyFileError = 'Modifying file ./data/messages.json fails';

module.exports = {
    getAllMessages(req, res) {
        fs.readFile(messagesFilePath, (err) => {
            if (err) {
                handlers.serverError(fileNotExistingError, req, res);
                return;
            }
            res.status(200).json(JSON.parse(fs.readFileSync(messagesFilePath).toString()));
        });
    },
    getMessage: (req, res) => {
        fs.readFile(messagesFilePath, (err) => {
            if (err) {
                handlers.serverError(fileNotExistingError, req, res);
                return;
            }

            let existingMessages = JSON.parse(fs.readFileSync(messagesFilePath).toString());

            let filteredMessage = existingMessages.filter(message => {
                return message.id === parseInt(req.params.id)
            });

            if (filteredMessage.length === 0) {
                handlers.serverError(messageNotExistingError, req, res);
                return;
            }

            res.status(200).json(filteredMessage);
        });
    },
    addMessage: (req, res) => {
        fs.readFile(messagesFilePath, (err) => {
            if (err) {
                handlers.serverError(fileNotExistingError, req, res);
                return;
            }

            let existingMessages = JSON.parse(fs.readFileSync(messagesFilePath).toString());
            const maxMessagesId = Math.max(...existingMessages.map(o => o.id), 1);
            const newMessage = {
                "id": Object.keys(existingMessages).length === 0 ? 1 : maxMessagesId + 1,
                "name": req.body.name,
                "email": req.body.email,
                "phone": req.body.phone,
                "subject": req.body.subject,
                "message": req.body.message
            };
            existingMessages.push(newMessage);

            let newMessagesJSON = JSON.stringify(existingMessages);
            fs.writeFile(messagesFilePath, newMessagesJSON, (err) => {
                if (err) {
                    handlers.serverError(modifyFileError, req, res);
                    return;
                }
                res.status(200).send({ result: 'New message added' });
            });
        });
    },
    deleteAllMessages: (req, res) => {
        fs.readFile(messagesFilePath, (err) => {
            if (err) {
                handlers.serverError(fileNotExistingError, req, res);
                return;
            }

            fs.writeFile(messagesFilePath, '[]', (err) => {
                if (err) {
                    handlers.serverError(modifyFileError, req, res);
                    return;
                }
                res.status(200).send({ result: 'All messages deleted' });
            });
        });
    },
    deleteMessage: (req, res) => {
        fs.readFile(messagesFilePath, (err) => {
            if (err) {
                handlers.serverError(fileNotExistingError, req, res);
                return;
            }

            let existingMessages = JSON.parse(fs.readFileSync(messagesFilePath).toString());

            const index = existingMessages.findIndex((message) => {
                return message.id === parseInt(req.params.id)
            });

            if (index === -1) {
                handlers.serverError(messageNotExistingError, req, res);
                return;
            }

            existingMessages.splice(index, 1);

            let newMessagesListJSON = JSON.stringify(existingMessages);
            fs.writeFile(messagesFilePath, newMessagesListJSON, (err) => {
                if (err) {
                    handlers.serverError(modifyFileError, req, res);
                    return;
                }
                res.status(200).send({ result: 'Message deleted' });
            });
        });
    }
};
