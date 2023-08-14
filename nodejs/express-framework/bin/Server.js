// dependencies
const http = require('http');
const app = require('../app')
const config = require('../config')

let port = config.serverConfig.port
// Create a web server
const server = http.createServer(app)
console.log('Server is created')
const onListening = () => {
    const address = server.address()
    const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${address.port}`;
    console.log('Server is listening on ' + bind)
}

console.log('Start server...')
server.listen(port);
console.log('Register listening event handler')
server.on('listening', onListening)