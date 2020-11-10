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

const messagesFilePath ='./data/messages.json';

exports.api = {
    getAllMessages: (req, res) => {
        fs.readFile(messagesFilePath, (err) => {
            if (err) {
                res.send({result: 'File not exists'});
                return;
            }
            res.status(200).json(JSON.parse(fs.readFileSync('./data/messages.json').toString()));
        });
    },
    addMessage: (req, res) => {
        const newMessage = {
            "name": req.body.name,
            "email": req.body.email,
            "phone": req.body.phone,
            "subject": req.body.subject,
            "message": req.body.message
        };

        fs.readFile(messagesFilePath, (err) => {
            if (err) {
                fs.writeFileSync(messagesFilePath, '[]', (err) => { if (err) throw err; })
            }

            let existingMessages = JSON.parse(fs.readFileSync(messagesFilePath).toString());
            existingMessages.push(newMessage);

            let newMessagesJSON = JSON.stringify(existingMessages);
            fs.writeFile(messagesFilePath, newMessagesJSON, function (err) {
                if (err) throw err;
                res.send({ result: 'New message added' });
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
