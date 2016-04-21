'use strict';

var express = require('express');
var app = express();
var url = require('url');

app.use(express.static(__dirname));

var mylog = [];
app.get('/log', function(req, res) {
    var query = url.parse(req.url, true).query;
    if (query) {
        console.log(query.data);
        if (query.data.length) {
            mylog.push(query.data);
        } 
        res.send(query.callback + '(\'{"data":"success"}\')');
    }    
});

app.get('/all', function(req, res) {
    var query = url.parse(req.url, true).query;
    if (query) {
        var content = '';
        if (mylog.length) {
            content = mylog.join('^');
            mylog = [];
        }
        res.send(query.callback + '(\'{"data":"' + content + '"}\')');
    }
});

app.listen(8888, function() {
    console.log('listen on 8888');
});