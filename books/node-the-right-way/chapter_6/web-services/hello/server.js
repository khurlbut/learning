#!/usr/bin/env node --harmony

/**
 * This is a simple Express based server.
 *
 * To continue, see the code in the 'b4' folder.
 */

'use strict';
const
	express = require('express'),
	app = express();
app.use(express.logger('dev'));
app.get('/api/:name', function(req, res) {
	res.json(200, { "hello": req.params.name });
});
app.listen(3000, function() {
	console.log("ready captain.");
});