'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Accept = require('accept');

const server = new Hapi.Server( {
	app: {
		i18n: {
			supportedLangs: ['en', 'fr', 'zh'],
			defaultLang: 'en'
		}
	}
});

server.connection({ port: 4000 });

server.register(require('vision'), (err) => {
	if (err) {
		throw err;
	}

	server.views({
		engines: {
			hbs: require('handlebars')
		},
		path: Path.join(__dirname, 'templates')
	});

	server.handler('i18n-view', (route, options) => {
		const view = options.view;
		const cntx = options.context;

		return function (request, reply) {

			const settings = server.settings.app.i18n;

			const langs = Accept.languages(request.headers['accept-language']);

			for (let i = 0; i < langs.length; ++i) {
				if (settings.supportedLangs.indexOf(langs[i]) !== -1) {
					return reply.view(view + '_' + langs[i], cntx);
				}
			}	

			reply.view(view + '_' + settings.defaultLang, cntx);
		};
	});

	server.route({
		method: 'GET',
		path: '/',
		handler: {
			'i18n-view': {
				view: 'index',
				context: {
					name: 'Kevin'
				}
			}
		}
	});

	server.start((err) => {
		if (err) {
			throw err;
		}

		console.log('Server started!');
	});
});
