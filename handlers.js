const fs = require('fs');

exports.home = (req, res) => {
    res.render('home', { currentPage: 'home' });
};

exports.tables = (req, res) => {
    res.render('tables', { currentPage: 'tables' });
};

exports.forms = (req, res) => {
    res.render('forms', { currentPage: 'forms' });
};

const messagesFilePath = './data/messages.json';

exports.api = {
    getAllMessages: (req, res) => {
        fs.readFile(messagesFilePath, (err) => {
            if (err) {
                res.status(404);
                res.send({ result: 'File does not exist' });
                return;
            }
            res.status(200).json(JSON.parse(fs.readFileSync(messagesFilePath).toString()));
        });
    },
    getMessage: (req, res) => {
        fs.readFile(messagesFilePath, (err) => {
            if (err) {
                res.send({ result: 'File does not exist' });
                return;
            }

            let existingMessages = JSON.parse(fs.readFileSync(messagesFilePath).toString());

            let filteredMessage = existingMessages.filter(message => {
                return message.id.toString() === req.params.id
            });

            if (filteredMessage.length === 0) {
                res.status(404);
                res.send({ result: 'Message does not exist'});
                return;
            }

            res.status(200).json(filteredMessage);
        });
    },
    addMessage: (req, res) => {
        fs.readFile(messagesFilePath, (err) => {
            if (err) {
                res.status(404);
                res.send({ result: 'File does not exist' });
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
                if (err) throw err;
                res.send({ result: 'New message added' });
            });
        });
    },
    deleteAllMessages: (req, res) => {
        fs.readFile(messagesFilePath, (err) => {
            if (err) {
                res.send({result: 'File does not exist'});
                return;
            }

            fs.writeFile(messagesFilePath, '[]', (err) => {
                if (err) throw err;
                res.send({ result: 'All messages deleted' });
            });
        });
    },
    deleteMessage: (req, res) => {
        fs.readFile(messagesFilePath, (err) => {
            if (err) {
                res.send({ result: 'File does not exist' });
                return;
            }

            let existingMessages = JSON.parse(fs.readFileSync(messagesFilePath).toString());

            const index = existingMessages.findIndex((message) => {
                // change req.params.id to number!
                return message.id.toString() === req.params.id
            });

            if (index === -1) {
                res.status(404);
                res.send({ result: 'Message with this id does not exist'});
                return;
            }

            existingMessages.splice(index, 1);

            let newMessagesListJSON = JSON.stringify(existingMessages);
            fs.writeFile(messagesFilePath, newMessagesListJSON, (err) => {
                if (err) throw err;
                res.status(200);
                res.send({ result: 'Message deleted' });
            });
        });
    }
};

exports.notFound = (req, res) => {
    res.status(404);
    res.render('404', { layout: 'error' });
};

exports.serverError = (err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500', { layout: 'error' });
};
