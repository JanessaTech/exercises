import { useEffect, useRef, useState } from "react"
import { SubscriptionOptions, WebSocketClient, WebSocketConfig, WebSocketMessage } from "./WebSocketClient"

const useWebSocket = (config: WebSocketConfig) => {
    const [isConnected, setIsConnected] = useState(false)
    const [subscriptionCount, setSubscriptionCount] = useState(0)
    const wsRef = useRef<WebSocketClient | null>(null)

    useEffect(() => {
        if (typeof window === undefined) return

        const client = new WebSocketClient(config)
        console.log('websocket client is created')
        wsRef.current = client

        const checkStateInterval = setInterval(() => {
            if (client) {
                const state = client.getConnectionState()
                console.log('ws state:', state)
                setIsConnected(state === 'OPEN')
                setSubscriptionCount(client.getSubscriptionCount())
            } else {
                console.log('waiting for the creation of the client')
            }
        }, 1000)

        return () => {
            clearInterval(checkStateInterval)
            client.close(1000, 'destory websocket manually')
        }
    }, [])

    const subscribe = (channel: string, 
                callback: (fullData: WebSocketMessage) => void,  
                options?: SubscriptionOptions) => {
        if (wsRef?.current) {
            const subscriptionId = wsRef.current!.subscribe(channel, callback, options)
            return subscriptionId
        } else {
            throw new Error('ws client is not found')
            
        }
    }
    const unsubscribe = (subscriptionId: string) => {
        if (wsRef?.current) {
            wsRef.current?.unsubscribe(subscriptionId)
        } else {
            throw new Error('ws client is not found')
        }
    }

    const getSubscriptions = () => {
        if (wsRef?.current) {
            return  wsRef.current?.getSubscriptions()
        } else {
            throw new Error('ws client is not found')
        }
    }

    return {subscribe, unsubscribe, getSubscriptions, isConnected, subscriptionCount}
}

export default useWebSocket