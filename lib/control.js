var express = require('express');
var bodyParser = require('body-parser');
var i18n = require('i18n');

var models = require('./models.js');

module.exports = {};

module.exports.init = function(app) {
    i18n.configure({
        directory: __dirname + '/../locales',
    });

    app.set('port', (process.env.PORT || 5000));
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'pug');

    app.use(express.static(__dirname + '/../static'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(i18n.init);
};

module.exports.setPaths = function(app) {
    app.get('/', function(request, response) {
        response.render('pages/index');
    });

    app.get('/thanks', function(request, response) {
        response.render('pages/thanks');
    });

    app.post('/api/submit', function(request, response) {
        var answer = new models.Answer(request.body);
        answer.save(function(err) {
            response.redirect('/thanks');
        });
    });
};

module.exports.start = function(app) {
    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });
};

