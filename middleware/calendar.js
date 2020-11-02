const fs = require('fs');

const getCalendarEventsList = JSON.parse(fs.readFileSync('./data/calendarEvents.json').toString());

const calendarEventsListMiddleware = (req, res, next) => {
    if(!res.locals.partials) {
        res.locals.partials = {};
    }
    res.locals.partials.calendarEventsListContext = getCalendarEventsList;
    next();
};

module.exports = calendarEventsListMiddleware;
