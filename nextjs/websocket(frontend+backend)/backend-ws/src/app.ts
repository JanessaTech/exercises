import express, {Request, Response, NextFunction} from 'express'
import http from 'http'
import WebSocket from 'ws'
import { WebsocketServer } from './WebSocketServer'

const app = express()
const server = http.createServer(app)
const PORT = 3100
const websocketServer = new WebsocketServer(server)

app.get('/broadcast', (req: Request, res: Response, next: NextFunction) => {
    try {
        const {channel, message} = req.query
        const sentCnt = websocketServer.broadcastToChannel(channel as string, message)
        const payload = {
            channel: channel,
            message: message,
            sentCnt: sentCnt
        }
        sendSuccess(res, payload)
    } catch(error) {
        console.log('failed to broadcast message:', error)
        next(error)
    }
})

app.get('/sendto', (req: Request, res: Response, next: NextFunction) => {
    try {
        const {channel, subscriptionId, message} = req.query
        websocketServer.sendToChannel(channel as string, subscriptionId as string, message)
        const payload = {
            channel: channel,
            subscriptionId: subscriptionId,
            message: message
        }
        sendSuccess(res, payload)
    } catch (error) {
        next(error)
    }
})
app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = {
            subscriptions:  Array.from(websocketServer.getSubscriptions().entries()).map(([channel, clients]) => ({
                channel: channel,
                clients: [...clients].map((client) => ({ws: websocketServer.getWsIdMap().get(client.ws), subscriptionId: client.subscriptionId}))
            })),
            reverseSubscriptions: Array.from(websocketServer.getReverseSubscriptions()).map(([ws, channels]) => ({
                ws: websocketServer.getWsIdMap().get(ws),
                channels: Array.from(channels)
            }))
        }
        sendSuccess(res, payload)
    } catch (error) {
        console.error('Failed to get status:', error)
        next(error)    
    }
})
    

const sendSuccess = (res: Response, data: any, code: number = 200) => {
    res.status(code).json({
        success: true,
        code: code,
        data: data
    })
}
const sendError = (res: Response, message: string, code: number = 500) => {
    res.status(code).json({
        success: false,
        code: code,
        message: message
    })
}
    

const handleError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    sendError(res, error.message)
}

app.use(handleError)

server.listen(PORT, () => {
    console.log(`
        API is ready
        WebSocket is started
        ws: ws://localhost:${PORT}
        http: http://localhost:${PORT}

        Test:
        /status - 
        /broadcast?channel=<channelName>&message=<message> - broadcast messages
        /sendto?channel=<channelName>&subscriptionId=<subscriptionId>&message=<message> -send message to a specific client with subscriptionId
    `)
})

//npm run start
