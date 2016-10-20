// Setup express server
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// app.get('/', function(req, res){
// 	res.send('<h1>Welcome</h1><br><p>sample text~</p>');
// });

// app.get('/', function(req, res){
// 	res.sendFile(__dirname + '/index.html');
// 	res.sendFile(__dirname + '/main.js');
// });
// Routing
app.use(express.static(__dirname));

http.listen(port, function(){
	console.log('Server is listening on *:%d', port);
});

var numUsers = 0;

io.on('connection', function(socket){
	var addedUser = false;
	//console.log('a user connected');
	// broadcast a new user is connected.
	
	socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('chat message','user disconnected!')
	});
    socket.on('chat message', function(msg){
    console.log('message: ' + msg);
	});
	socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  	});

  	 // when the client emits 'add user', this listens and executes
  	socket.on('add user', function (username) {
  	
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    console.log('add user: ' + numUsers);
    addedUser = true;
    socket.broadcast.emit('chat message','user: ' + username + ' connected!')
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });
});


