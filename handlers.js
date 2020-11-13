const messagesApi = require('./middleware/messages');

exports.home = (req, res) => {
    res.render('home', { currentPage: 'home' });
};

exports.tables = (req, res) => {
    res.render('tables', { currentPage: 'tables' });
};

exports.forms = (req, res) => {
    res.render('forms', { currentPage: 'forms' });
};

exports.api = {
    getAllMessages: (req, res) => { messagesApi.getAllMessages(req, res) },
    getMessage: (req, res) => { messagesApi.getMessage(req, res) },
    addMessage: (req, res) => { messagesApi.addMessage(req, res) },
    deleteAllMessages: (req, res) => { messagesApi.deleteAllMessages(req, res) },
    deleteMessage: (req, res) =>  { messagesApi.deleteMessage(req, res) },
};

exports.notFound = (req, res) => {
    res.status(404);
    res.render('404', { layout: 'error' });
};

exports.serverError = (err, req, res, next) => {
    res.status(500);
    res.render('500', { layout: 'error', errMessage: err });
};
