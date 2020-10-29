const express = require('express');
const expressHandlebars = require('express-handlebars');

const handlers = require('./handlers');

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

// ROUTES DEFINITIONS
app.get('/', handlers.home);

app.use(handlers.notFound);
app.use(handlers.serverError);

app.listen(port, () => console.log(`Express app is running: http://localhost:${port}`));
