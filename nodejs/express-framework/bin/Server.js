const http = require('http');
const app = require('../app')
const config = require('../config')
const logger = require('../helpers/logger')
const banner = require('../helpers/banner')

let port = config.port
logger.info(banner)
logger.info(`Server Port : ${port}`, port)
logger.info(`Environment type: ${config.env}`)
// Create a web server
const server = http.createServer(app)
logger.info('Server is created')
const onListening = () => {
    const address = server.address()
    const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${address.port}`;
    logger.info('Server is listening on ' + bind)
}

logger.info('Start server...')
server.listen(port);
logger.info('Register listening event handler')
server.on('listening', onListening)
