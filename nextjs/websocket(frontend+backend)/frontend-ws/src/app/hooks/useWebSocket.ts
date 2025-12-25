import { useEffect, useRef, useState } from "react"
import { Subscription, SubscriptionOptions, WebSocketClient, WebSocketConfig, WebSocketMessage } from "./WebSocketClient"

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
            client.disconnect(3000, 'destory websocket by running clearance in useEffect')
        }
    }, [])

    const connect = () => {
        if (wsRef?.current) {
            wsRef.current!.connect()
        } else {
            throw new Error('ws client is not found')
        }
    }

    const disconnect = () => {
        if (wsRef?.current) {
            wsRef.current!.disconnect(3001, 'close websocket manually')
        } else {
            throw new Error('ws client is not found')
        }
    }

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
            return new Map<string, Subscription>
        }
    }

    return {connect, 
            disconnect, 
            subscribe, 
            unsubscribe, 
            getSubscriptions, 
            isConnected, subscriptionCount}
}

export default useWebSocket