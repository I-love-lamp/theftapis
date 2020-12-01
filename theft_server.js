'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thefts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var thefts = require('./routes/theft.js')(app);

var server = app.listen(3002, function () {
    console.log('Server running at http://127.0.0.1:3002/');
});