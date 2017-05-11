/**
 * This is a 'bare bones' Node only Web Server.
 *
 * There is not much too it.  Everything (routing, session management,
 * request parsing and validation) must be handled in our own code.
 *
 * We ususally turn to some kind of framework to help us manage all
 * of the tedious details of creating a web app.
 *
 * In this demonstration we will use Express.
 *
 * See the code in the 'hello' folder to continue.
 */

const
	http = require('http');
	server = http.createServer(function(req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Hello, World!');
	});

server.listen(3000, function() {
	console.log('ready captain!');
});