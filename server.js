const express = require('express');
const http = require('http');
const path = require('path');
const nunjucks = require('nunjucks');
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

app.get('/', (req, res) => {
    res.render('pages/index.html');
});

app.listen(3000, () => {
    console.log('Running node server');
});
