'use strict';

const
  Q = require('q'),
  request = require('request');

module.exports = function(config, app) {

  /**
   * create a new bundle with the specified name
   * curl -X POST http://localhost:3000/api/bundle?name=<name>
   *
   * We use Q to handle our 'promise'. This is an example of 
   * the long form.
   */
	app.post('/api/bundle', function(req, res) {

		let deferred = Q.defer();

		request.post({
			url: config.b4db,
			json: { type: 'bundle', name: req.query.name, books: {} }
		}, function(err, couchRes, body) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve([couchRes, body]);
			}
		});

		deferred.promise.then(function(args) {
			let couchRes = args[0], body = args[1];
			res.json(couchRes.statusCode, body);
		}, function(err) {
			res.json(502, { error: "bad_gateway", reason: err.code });
		});
	});
  
  /**
   * get a given bundle
   * curl -X POST http://localhost:3000/api/bundle/<id>
   *
   * Here we use the shortcut for promise handling in Q which makes
   * use of the nfcall() method. 
   * 
   * This is the more succinct and common form.
   */
	app.get('/api/bundle/:id', function(req, res) {
		Q.nfcall(request.get, config.b4db + '/' + req.params.id)
			.then(function(args) {
				let couchRes = args[0], bundle = JSON.parse(args[1]);
				res.json(couchRes.statusCode, bundle);
			}, function(err) {
				res.json(502, { error: "bad_gateway", reason: err.code });
			})
		// done forces any unhandled rejected promises to throw. It does
		// not really mean much when there is only 1 promise (so the above
		// POST version is ok without it). However, promises might swallow
		// errors when we have a chain of them. So, we didn't really need 
		// this one here, but it is generally good practice to call it all
		// the time.
		.done(); 
	})

  /**
   * set the specified bundle's name with the specified name
   * curl -X PUT http://localhost:3000/api/bundle/<id>/name/<name>
   */
  	app.put('/api/bundle/:id/name/:name', function(req, res) {
		Q.nfcall(request.get, config.b4db + '/' + req.params.id)
			.then(function(args) {
				let couchRes = args[0], bundle = JSON.parse(args[1]);
				if (couchRes.statusCode !== 200) {
					return [couchRes, bundle];
				}

				bundle.name = req.params.name;
				return Q.nfcall(request.put, {
					url: config.b4db + '/' + req.params.id,
					json: bundle
				});
			})
			.then(function (args) {
				let couchRes = args[0], body = args[1];
				res.json(couchRes.statusCode, body);
			})
			.catch(function(err) {
				res.json(502, {error: "bad_gateway", reason: err.code});
			})
		.done();
	})

  /**
   * put a book into a bundle by its id
   * curl -X PUT http://localhost:3000/api/bundle/<id>/book/<pgid>
   *
   * This demonstrates using generators with promises.
   */
	app.put('/api/bundle/:id/book/:pgid', function(req, res) {

		let
			/*
			Q.denodify() takes a node-style function (one that expects
			a callback) and turns it into a Promise producing function.

			It saves us from calling Q.nfcall() all over the place.
			 */
			get = Q.denodeify(request.get),
			put = Q.denodeify(request.put);

		/*
		Q.async takes a Generator function and returns a Promise
		producing function that will start running the Generator
		when you invoke it.  

		See it's invocation at the end of the declaration (the 
		empty '()' at the bottom).
		 */
		Q.async(function* () {
			let args, couchRes, bundle, book;

			// grab the bundle from the b4 database
			args = yield get(config.b4db + req.params.id);
			couchRes = args[0];
			bundle = JSON.parse(args[1]);

			// fail fast if we couldn't retrieve the bundle
			if (couchRes.statusCode !== 200) {
				res.json(couchRes.statusCode, bundle);
				return;
			}

			// look up the book by its Project Gutenberg ID
			args = yield get(config.bookdb + req.params.pgid);
			couchRes = args[0];
			book = JSON.parse(args[1]);

			// fail fast if we couldn't retrieve the book
			if (couchRes.statusCode !==200) {
				res.json(couchRes.statusCode, book);
				return;
			}

			// add the book to the bundle and put it back in CouchDB
			bundle.books[book._id] = book.title;
			args = yield put({url: config.b4db + bundle._id, json: bundle});
			res.json(args[0].statusCode, args[1]);

		}) ()
		.catch(function(err) {
			res.json(502, { error: "bad_gateway", reason: err.code});
		});
	});

};