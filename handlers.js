exports.home = (req, res) => {
    res.render('home');
};

exports.tables = (req, res) => {
    res.render('tables');
};

exports.forms = (req, res) => {
    res.render('forms');
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
