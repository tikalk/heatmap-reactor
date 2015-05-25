var vertx = require('vertx');
var container = require('vertx/container');
var console = require('vertx/console');
var config = container.config;

container.deployModule("com.zanox.vertx~mod-kafka~1.1.0", config);

vertx.createHttpServer().requestHandler(function(request) {
	request.dataHandler(function(buffer) {
   		vertx.eventBus.send(config.address, {payload:buffer.toString()});
	});
	request.response.end();      
}).listen(config.httpServerPort, config.httpServerHost);

console.log("HTTP CheckinsReactor started on port "+config.httpServerPort);

