const express = require('express');
const http = require('http');
const path = require('path');
const nunjucks = require('nunjucks');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'njs');

app.get('/timestamp', (request, response) => {
    let timeQuery = null;
    let timestamp = {
        unix: null,
        natural: null
    };

    if (request.query.time) {
        if (moment(request.query.time, 'MMMM-DD-YYYY').isValid() ||
                moment.unix(request.query.time).isValid) {
            // Query is in a string format
            if (isNaN(request.query.time)) {
                timeQuery = moment(request.query.time, 'MMMM-DD-YYYY');
            }
            // Query is in unix format
            else {
                timeQuery = moment.unix(request.query.time);
            }
            timestamp = {
                unix: timeQuery.unix(),
                natural: timeQuery.format('MMMM Do YYYY')
            };
        }
    }

    console.log(timestamp);
    response.render('pages/index', {timestamp: timestamp});
});

app.listen(3000, () => {
    console.log('Running node server');
});
