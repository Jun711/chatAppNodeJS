var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
	res.send('<h1>Welcome</h1><br><p>sample text~</p>');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});