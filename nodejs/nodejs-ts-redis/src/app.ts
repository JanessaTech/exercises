
import express, { Request, Response } from 'express';
import http from 'http'
import redisClient from './redis-client';

const app = express();
const port = 3000

interface ApiResponse {
  success: boolean;
  data?: any;
  source?: 'cache' | 'database'
  error?: string;
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/cache/:key', async (req: Request, res: Response<ApiResponse>) => {
  try {
    const cachedData = await redisClient.get(req.params.key);
    if (cachedData) {
      res.status(200).json({ 
        success: true, 
        source: 'cache',
        data: JSON.parse(cachedData) 
      });
      return
    }

    const newData = { id: req.params.key, value: Date.now() };
    await redisClient.set(req.params.key, JSON.stringify(newData), 60);
    
    res.json({ 
      success: true, 
      source: 'database',
      data: newData 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

const server = http.createServer(app)
  
const onListening = () => {
    const address = server.address()
    const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${address?.port}`;
    console.info('Server is listening on ' + bind)
}

console.info('Register listening event handler')


server.on('listening', onListening)
const start = (port: number) => {
    try {
        console.info('Start server...')
        server.listen(port);
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Failed to start server due to : ${e.message}`)
        }
        process.exit()
    }
}

start(port)


