var express = require('express');
var app = express();
var path = require('path');
var port = 3000;
// viewed at http://localhost:8080
app.get('/', function(req, res) {
	console.log("localhost @ port "+port);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use("/Styles", express.static(__dirname + '/Styles'));
app.use("/UI", express.static(__dirname + '/UI'));
app.listen(port);