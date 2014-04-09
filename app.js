var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    logger = require('morgan');

server.listen(3000);
    
app.use(logger('dev'));
app.use('/static', express.static(__dirname + '/static'));
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
    socket.on('message', function(data) {
        socket.emit('message', { name: 'xxx', msg: data.msg });
    });
});
