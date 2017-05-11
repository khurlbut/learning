const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.register([
	{ register: require('./plugins/web') },
	{ register: require('./plugins/auth'), options: {
		bell: {
			provider: 'facebook',
			isSecure: false,
			password: 'password-that-is-at-least-32-chars',
			clientId: '183767322129924',
			clientSecret: '7225a9c9036bef51112b6e34b87da53f'
		},
		cookies: {
			password: 'password-that-is-at-least-32-chars',
			cookie: 'wallpaper-session',
			isSecure: false
		}
	} },
	{ register: require('vision') },
	{ register: require('bell') },
	{ register: require('hapi-auth-cookie') }
], (err) => {
	
	if (err) {
		throw err;
	}

	server.start((err) => {
		
		if (err) {
			throw err;
		}
	
		console.log('Started server');
	});
});	
