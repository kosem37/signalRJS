module.exports = require("./lib/signalRJS");
var express = require('express');
var SignalRJS = require('signalrjs');

//Init SignalRJs
var signalR = SignalRJS();

//Create the hub connection
//NOTE: Server methods are defined as an object on the second argument
signalR.hub('mainHub',{
	send : function(userName,message){
		this.clients.all.invoke('broadcast').withArgs([userName,message])
		console.log('send:'+message);
	}
});

var server = express();
server.use(express.static(__dirname));
server.use(signalR.createListener())
server.listen(9999);
