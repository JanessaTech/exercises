import { useEffect, useState } from "react"
import { SubscriptionOptions, WebSocketClient, WebSocketConfig, WebSocketMessage } from "./WebSocketClient"

const useWebSocket = (config: WebSocketConfig) => {
    const [client, setClient] = useState<WebSocketClient | undefined>(undefined)
    const [isConnected, setIsConnected] = useState(false)
    const [subscriptionCount, setSubscriptionCount] = useState(0)

    useEffect(() => {
        if (typeof window === undefined) return

        const client = new WebSocketClient(config)
        console.log('websocket client is created')
        setClient(client)

        const checkStateInterval = setInterval(() => {
            if (client) {
                const state = client.getConnectionState()
                setIsConnected(state === 'OPEN')
                setSubscriptionCount(client.getSubscriptionCount())
            } else {
                console.log('waiting for the creation of the client')
            }
        }, 1000)

        return () => {
            clearInterval(checkStateInterval)
            client.close(1000, 'destory websocket manually')
            setClient(undefined)
        }

    }, [])

    const subscribe = (channel: string, 
                callback: (payload: any, fullData?: WebSocketMessage) => void,  
                options?: SubscriptionOptions) => {
        if (client) {
            const subscriptionId = client.subscribe(channel, callback, options)
            return subscriptionId
        } else {
            throw new Error('client is not found')
            
        }
    }
    const unsubscribe = (subscriptionId: string) => {
        if (client) {
            client.unsubscribe(subscriptionId)
        } else {
            throw new Error('client is not found')
        }
    }

    const getSubscriptions = () => {
        if (client) {
            return client.getSubscriptions()
        } else {
            throw new Error('client is not found')
        }
    }

    return {subscribe, unsubscribe, getSubscriptions, isConnected, subscriptionCount}
}

export default useWebSocket