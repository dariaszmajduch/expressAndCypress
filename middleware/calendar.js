const getCalendarEventsList = () => [
    {
        event: {
            daytime: 'Morning',
            tasks: {
                monday: 'Work',
                tuesday: 'Work',
                wednesday: 'Work',
                thursday: 'Work',
                friday: 'Work',
                saturday: '',
                sunday: ''
            }
        }
    },
    {
        event: {
            daytime: 'Afternoon',
            tasks: {
                monday: 'Meeting',
                tuesday: 'Gym',
                wednesday: '',
                thursday: 'English',
                friday: 'Gym',
                saturday: 'English',
                sunday: ''
            }
        }
    },
    {
        event: {
            daytime: 'Evening',
            tasks: {
                monday: '',
                tuesday: 'Meeting',
                wednesday: '',
                thursday: 'Gym',
                friday: '',
                saturday: 'Work',
                sunday: ''
            }
        }
    },
    {
        event: {
            daytime: 'Night',
            tasks: {
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: 'Meeting',
                saturday: '',
                sunday: ''
            }
        }
    },
];

const calendarEventsListMiddleware = (req, res, next) => {
    if(!res.locals.partials) {
        res.locals.partials = {};
    }
    res.locals.partials.calendarEventsListContext = getCalendarEventsList();
    next();
};

module.exports = calendarEventsListMiddleware;
