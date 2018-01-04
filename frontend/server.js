var express = require('express');
var app = express();

app.listen(8080);

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/app', express.static(__dirname + '/app'));

app.get('*', function(req, res) {
        res.sendfile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });