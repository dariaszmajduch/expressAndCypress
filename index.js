const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create needed file when app is started
fs.readFile('./data/messages.json', (err) => {
    if (err) {
        fs.writeFileSync('./data/messages.json', '[]', (err) => { if (err) throw err; })
    }
});

// MIDDLEWARE
app.use(calendarMiddleware);

// ROUTES DEFINITIONS
app.get('/', handlers.home);
app.get('/tables', handlers.tables);
app.get('/forms', handlers.forms);

app.get('/api/get-all-messages', handlers.api.getAllMessages);
app.post('/api/add-message', handlers.api.addMessage);

app.use(handlers.notFound);
app.use(handlers.serverError);

app.listen(port, () => console.log(`Express app is running: http://localhost:${port}`));
