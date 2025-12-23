import { useEffect, useState } from "react"
import { SubscriptionOptions, WebSocketClient, WebSocketConfig, WebSocketMessage } from "./WebSocketClient"


const useWebSocket = (config: WebSocketConfig) => {
    const [client, setClient] = useState<WebSocketClient | undefined>(undefined)

    useEffect(() => {
        if (typeof window === undefined) return

        const client = new WebSocketClient(config)
        setClient(client)

    }, [])

    const subscribe = (channel: string, 
                callback: (payload: any, fullData?: WebSocketMessage) => void,  
                options?: SubscriptionOptions) => {
        if (client) {
            const subscriptionId = client.subscribe(channel, callback, options)
            return subscriptionId
        } else {
            console.error('not found client')
            
        }
        return 'error'
    }
    const unsubscribe = () => {
        
    }
}

export default useWebSocket