const express = require('express');
const expressHandlebars = require('express-handlebars');

const handlers = require('./handlers');
const calendarMiddleware = require('./middleware/calendar');

const app = express();
const port = process.env.PORT || 3000;

const handlebarsOptions = expressHandlebars.create({
    defaultLayout: 'main',
    helpers: {
        unlessEq: function (arg1, arg2, options) { return (arg1 !== arg2) ? options.fn(this) : options.inverse(this); },
    }
});

app.engine('handlebars', handlebarsOptions.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

// MIDDLEWARE
app.use(calendarMiddleware);

app.post('/api/add-message', handlers.api.addMessage);

// ROUTES DEFINITIONS
app.get('/', handlers.home);
app.get('/tables', handlers.tables);
app.get('/forms', handlers.forms);

app.use(handlers.notFound);
app.use(handlers.serverError);

app.listen(port, () => console.log(`Express app is running: http://localhost:${port}`));
