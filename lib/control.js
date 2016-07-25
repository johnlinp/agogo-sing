var express = require('express');

var models = require('./models.js');

module.exports = {};

module.exports.init = function(app) {
    app.set('port', (process.env.PORT || 5000));
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'pug');

    app.use(express.static(__dirname + '/../static'));
};

module.exports.setPaths = function(app) {
    app.get('/', function(request, response) {
        response.render('pages/index', {
            user: request.user
        });
    });

    app.post('/api/submit', function(request, response) {
        response.json({
            success: true,
        });
    });
};

module.exports.start = function(app) {
    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });
};

