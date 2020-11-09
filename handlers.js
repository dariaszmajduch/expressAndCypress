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
    allMessages: async (req, res) => {
        res.status(200).json({message: "Get request successful"});
        console.log('Data get');
    },
    addMessage: (req, res) => {
        console.log(req.body.name);
        console.log(req.body.email);
        console.log(req.body.phone);
        console.log(req.body.subject);
        console.log(req.body.message);

        res.send({ result: 'success' });
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
