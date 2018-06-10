var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.get('/', function(request, response){
    response.sendFile(__dirname + '/chat_client.html');
});

var count = 1;
io.sockets.on('connection', function(socket){
    console.log('user connected: ', socket.id);
    var name = "user" + count++;
    io.to(socket.id).emit('change name', name);

    socket.on('disconnect', function(){
        console.log('user disconnected: ', socket.id);
    });

    socket.on('send message', function(name, text){
        var msg = name + ' : ' + text;
        console.log(msg);
        io.sockets.emit('receive message', msg);
        //socket.broadcast.emit('receive message', msg);

    });
});

http.listen(8000, function(){
    console.log('server on!');
});