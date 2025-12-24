'use client'

import { useState } from "react";
import { WebSocketConfig } from "./hooks/WebSocketClient";
import useWebSocket from "./hooks/useWebSocket";

export default function Home() {
  const config: WebSocketConfig = {
      url: '', 
      maxReconnectAttempts: 5, 
      reconnectInterval: 2}

  //const {subscribe, unsubscribe, isConnected, subscriptionCount} = useWebSocket(config)
  const [channel, setChannel] = useState('')
  const [subscriptionId, setSubscriptionId] = useState('')

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const handleUnsubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const handleChannelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setChannel(value)
  }

  const handleSubscriptionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSubscriptionId(value)
  }

  console.log(`channel=${channel}, subscriptionId=${subscriptionId}`)

  return (
    <div>
      <div className="text-red-600 font-semibold">Websocket demo:</div>
      <div>
        <div><span className="font-semibold">isConnected:</span><span>{}</span></div>
        <div><span className="font-semibold">subscriptionCount:</span>{}</div>
        <div>
          <button className="px-2 py-1 rounded-full bg-zinc-300" onClick={handleSubscribe}>subscribe</button>
          <input value={channel} type="text" onChange={handleChannelChange}
                className="border-zinc-200 border-[2px] ml-2 px-2"/>
        </div>
        <div className="my-2">
          <button className="px-2 py-1 rounded-full bg-zinc-300" onClick={handleUnsubscribe}>unsubscribe</button>
          <input value={subscriptionId} type="text" onChange={handleSubscriptionIdChange}
                className="border-zinc-200 border-[2px] ml-2 px-2"/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="font-semibold">channel</div><div className="font-semibold">latest message</div>
        <div>channel-1</div><div>message-1</div>
        <div>channel-2</div><div>message-2</div>
      </div>
    </div>
  );
}
