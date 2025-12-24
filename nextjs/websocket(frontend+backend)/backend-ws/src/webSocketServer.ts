import express, {Request, Response, NextFunction} from 'express'
import http from 'http'
import WebSocket from 'ws'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({server})
const PORT = 3100

const subscriptions  = new Map<string, Set<{ws: WebSocket, subscriptionId: string}>>()
const reverseSubscriptions = new Map<WebSocket, Set<string>>()
const wsIdMap = new Map<WebSocket, string>()

wss.on('connection', (ws: WebSocket) => {
    console.log('A client is connected')
    // generate an ID for each ws

    //const connectionId = uuidv4()
    const connectionId = `conn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    
    wsIdMap.set(ws, connectionId)
    ws.on('message', (data: Buffer) => {
        try {
            const message = JSON.parse(data.toString())
            console.log('message received:', message)
            handleMessage(ws, message)
        } catch(error) {
            console.error('failed to parse message', error)
        }
    })

    ws.on('close', () => {
        console.log('A client is disconnected')
        const channels = reverseSubscriptions.get(ws)
        if (channels) {
            channels.forEach((channel) => {
                const clients = subscriptions.get(channel)
                if (clients) {
                    for (let client of clients) {
                        if (wsIdMap.get(ws) && wsIdMap.get(ws) === wsIdMap.get(client.ws)) {
                            clients.delete(client)
                        }
                    }
                    if (clients.size === 0) {
                        subscriptions.delete(channel)
                    }
                }
            })
            reverseSubscriptions.delete(ws)
            wsIdMap.delete(ws)
        }
    })

})

function handleMessage(ws: WebSocket, message: any) {
    switch(message?.type) {
        case 'SUBSCRIBE':
            subscribe(ws, message.channel, message.subscriptionId)
            break
        case 'UNSUBSCRIBE':
            unsubscribe(ws, message.channel, message.subscriptionId)
            break
        default:
            console.log('The unknown type for the message:', message)
    }
}

function subscribe(ws: WebSocket, channel: string, subscriptionId: string) {
    if (!subscriptions.has(channel)) {
        subscriptions.set(channel, new Set())
    }
    subscriptions.get(channel)!.add({ws, subscriptionId})
    
    if (!reverseSubscriptions.has(ws)) {
        reverseSubscriptions.set(ws, new Set())
    }
    reverseSubscriptions.get(ws)!.add(channel)
    console.log(`subscriptionId ${subscriptionId} is added to channel ${channel}`)
}

function unsubscribe(ws: WebSocket, channel: string, subscriptionId: string) {
    const clients = subscriptions.get(channel)
    if (clients) {
        for (let client of clients) {
            if (client.subscriptionId === subscriptionId) {
                clients.delete(client)
                console.log(`subscriptionId ${subscriptionId} is removed from channel ${channel}`)
                break
            }
        }
    }
    const channels = reverseSubscriptions.get(ws)
    if(channels) {
        channels.delete(channel)
    }
}

function broadcastToChannel(channel: string, data: any) {
    const clients = subscriptions.get(channel)
    if (!clients) return 0
    let sentCnt = 0
    
    for (let client of clients) {
        const message = {
            type: 'DATA_UPDATE',
            subscriptionId: client.subscriptionId,
            payload: data,
            timestamp: Date.now()
        }
        client.ws.send(JSON.stringify(message))
        sentCnt++
    }
    console.log(`broadcast message from channel ${channel} to ${sentCnt} clients`)
    return sentCnt;
}

app.get('/broadcast', (req: Request, res: Response, next: NextFunction) => {
    try {
        const {channel, message} = req.query
        const sentCnt = broadcastToChannel(channel as string, message)
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
app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = {
            subscriptions:  Array.from(subscriptions.entries()).map(([channel, clients]) => ({
                channel: channel,
                clients: [...clients].map((client) => ({ws: wsIdMap.get(client.ws), subscriptionId: client.subscriptionId}))
            })),
            reverseSubscriptions: Array.from(reverseSubscriptions).map(([ws, channels]) => ({
                ws: wsIdMap.get(ws),
                channels: channels
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
    `)
})
