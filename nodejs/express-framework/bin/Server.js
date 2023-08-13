// dependencies
const http = require('http');
const app = require('../app')
const config = require('../config/coreConfig')

let port = config.serverConfig.port
// Create a web server
const server = http.createServer(app);
const onListening = () => {
    const address = server.address()
    const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${address.port}`;
    console.log('Server is listening on ' + bind)
}

// server starts
server.listen(port);

server.on('listening', onListening)