'use client'

import { WebSocketConfig } from "./hooks/WebSocketClient";
import useWebSocket from "./hooks/useWebSocket";

export default function Home() {
  const config: WebSocketConfig = {
      url: '', 
      maxReconnectAttempts: 10, 
      reconnectInterval: 5}

  const {subscribe, unsubscribe, isConnected, subscriptionCount} = useWebSocket(config)

  return (
    <div>
      <div>Websocket demo</div>
    </div>
  );
}
