

enum WebSocketReadyState {
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3
}

interface WebSocketConfig {
    url: string;
    maxReconnectAttempts: number;
    reconnectInterval : number;
    heartbeatInterval?: number;
}

interface WebSocketMessage {
    type: string;
    channel?: string;
    subscriptionId?: string;
    payload?: any;
    timestamp?: number
}

interface Subscription {
    channel: string;
    callback: (payload: any, fullData?: WebSocketMessage) => void; 
    options?: SubscriptionOptions
}

// for extension
interface SubscriptionOptions {}

class WebSocketClient {
    private ws: WebSocket | null = null
    private isConnecting: boolean = false;
    private config!: WebSocketConfig;
    private reconnectAttempts : number = 0;
    private reconnectTimer?: NodeJS.Timeout;
    private heartbeatTimer?: NodeJS.Timeout;
    
    private messageQueue!: WebSocketMessage[]
    private subscriptions!: Map<string, Subscription>

    constructor(_config: WebSocketConfig) {
        this.config = _config
        this.messageQueue = []
        this.subscriptions = new Map<string, Subscription>()
    }

    private connect(): void {
        if (this.isConnecting || this.ws?.readyState === WebSocketReadyState.OPEN) return
        this.isConnecting = true

        try {
            this.setupEventListeners()
        } catch (error) {
            console.error('Failed to create websocket:', error)
            this.isConnecting = false
            this.handleReconnect()
        }
    }

    private setupEventListeners(): void {
        if (!this.ws) return
        this.ws = new WebSocket(this.config.url)

        this.ws.onopen = (event: Event) => {
            this.isConnecting = false
            this.reconnectAttempts = 0
            console.log('Connected to websocket!')

            this.messageQueue = []
            //this.resubscribeAll()
            this.startHeartbeat()
        }

        this.ws.onmessage = (event: MessageEvent) => {
            try {
                const data: WebSocketMessage = JSON.parse(event.data as string)
                this.handleMessage(data)
            } catch(error) {
                console.error('failed to parse message:', error, event.data)
            }
        }

        this.ws.onerror = (event: Event) => {
            this.isConnecting = false
            console.error('Failed to connect to websocket, retry...')
            this.handleReconnect()
        }

        this.ws.onclose =  (event: CloseEvent) => {
            this.isConnecting = false
            console.log(`websocket is closed. code: ${event.code}, reason: ${event.reason}`)
            this.clearHeartbeat()
            if (event.code === 100) {
                console.log('websocket is closed successfully, exit')
                return
            }
            console.log('websocket is closed unexpected, reconnecting ...')
            this.handleReconnect()
        }
    }

    private handleReconnect(): void {
        if (this.reconnectAttempts > this.config.maxReconnectAttempts) {
            console.error(`Reached the max reconnect attempts ${this.config.maxReconnectAttempts}, Stop!`)
            return
        }
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer)
            this.reconnectTimer = undefined
        }
        this.reconnectAttempts++;
        const delay = this.config.reconnectInterval * this.reconnectAttempts
        console.log(`Try to reconnect... (${this.reconnectAttempts}/${this.config.maxReconnectAttempts}). Delay: ${delay} ms`)

        this.reconnectTimer = setTimeout(() => {
            this.connect()
        }, delay)
    }

    private resubscribeAll(): void {
        if (this.subscriptions.size === 0) return
        console.log(`re-subscribe ${this.subscriptions.size} channels`)
        this.subscriptions.forEach((subscription, subscriptionId) => {
            const resubscribeMsg: WebSocketMessage = {
                type: 'SUBSCRIBE',
                channel: subscription.channel,
                subscriptionId: subscriptionId
            }
            this.send(resubscribeMsg)
        })
    }

    private startHeartbeat(): void {
        if (!this.config?.heartbeatInterval || this.config.heartbeatInterval <= 0) return
        this.clearHeartbeat()
        if (this.ws?.readyState === WebSocketReadyState.OPEN) {
            this.heartbeatTimer = setInterval(() => {
                const heartbeatMsg: WebSocketMessage = {
                    type: 'PING',
                    timestamp: Date.now()
                }
                this.send(heartbeatMsg)
                console.log('one heartbeat is sent')
            }, this.config.heartbeatInterval)
        }
    }

    private clearHeartbeat(): void {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer)
            this.heartbeatTimer = undefined;
        }
    }

    private handleMessage(data: WebSocketMessage): void {
        if (data.type === 'DATA_UPDATE' && data.subscriptionId) {
            const subcription = this.subscriptions.get(data.subscriptionId)
            if (subcription?.callback) {
                subcription.callback(data.payload, data)
            }
            return
        }
        // deal with the rest of types

    }

    private generateId(): string {
        return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }

    private send(message: WebSocketMessage): boolean {
        if (!this.ws || this.ws.readyState !== WebSocketReadyState.OPEN) {
            if (message.type === 'SUBSCRIBE' || message.type === 'UNSUBSCRIBE') {
                this.messageQueue.push(message)
            }
            return false
        }
        try {
            this.ws.send(JSON.stringify(message))
            return true
        } catch(error) {
            console.error('failed to send message:', error)
            if (message.type === 'SUBSCRIBE' || message.type === 'UNSUBSCRIBE') {
                this.messageQueue.push(message)
            }
            return false
        }
    }

    subscribe(
        channel: string,
        callback: (payload: any, fullData?: WebSocketMessage) => void,
        options: SubscriptionOptions = {}
        ): string {
            const subscriptionId = this.generateId()
            this.subscriptions.set(subscriptionId, {channel, callback, options})

            const subscribeMsg: WebSocketMessage = {
                type: 'SUBSCRIBE',
                channel: channel,
                subscriptionId: subscriptionId
            }
            this.send(subscribeMsg)
        return subscriptionId
    }

    unsubscribe(subscriptionId: string): boolean {
        const subscription = this.subscriptions.get(subscriptionId)
        if (!subscription) return false
        const unsubscribeMsg: WebSocketMessage = {
            type: 'UNSUBSCRIBE',
            channel: subscription.channel,
            subscriptionId: subscriptionId
        }
        this.send(unsubscribeMsg)
        this.subscriptions.delete(subscriptionId)
        return true
    }

    getConnectionState(): string {
        if (!this.ws) return 'NOT_INITIALIZED'
        switch (this.ws.readyState) {
            case WebSocketReadyState.CONNECTING:
        return 'CONNECTING';
      case WebSocketReadyState.OPEN:
        return 'OPEN';
      case WebSocketReadyState.CLOSING:
        return 'CLOSING';
      case WebSocketReadyState.CLOSED:
        return 'CLOSED';
      default:
        return 'UNKNOWN';
        }
    }

    getSubscriptionCount(): number {
        return this.subscriptions.size;
    }
    close(code: number = 1000, reason: string = 'normal close'): void {
        console.log(`close websocke manually.code: ${code}, reason: ${reason}`)
        
        this.clearHeartbeat()
        
        if (this.reconnectTimer) {
          clearTimeout(this.reconnectTimer);
        }
    
        if (this.ws) {
          this.ws.close(code, reason);
        }
    
        this.subscriptions.clear();
        this.messageQueue = [];
      }
}