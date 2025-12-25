'use client'

import { useState } from "react";
import { WebSocketConfig, WebSocketMessage } from "./hooks/WebSocketClient";
import useWebSocket from "./hooks/useWebSocket";

export default function Home() {
  const config: WebSocketConfig = {
      url: 'ws://localhost:3100', 
      maxReconnectAttempts: 5, 
      reconnectInterval: 2}

  const {subscribe, unsubscribe, isConnected, subscriptionCount} = useWebSocket(config)
  const [channel, setChannel] = useState('')
  const [subscriptionId, setSubscriptionId] = useState('')
  const [subscribedMap, setSubscribedMap] = useState<Map<string, {channel: string, fullData?: WebSocketMessage}>>(new Map())

  const callback = (fullData: WebSocketMessage) => {
    console.log('Received fulldata:', fullData)
    const subscriptionId = fullData.subscriptionId
    if (subscriptionId && subscribedMap.has(subscriptionId)) {
      const newSubscribedMap = new Map(subscribedMap)
      const value = subscribedMap.get(subscriptionId)
      newSubscribedMap.set(subscriptionId, {channel: value!.channel, fullData: fullData})
    } else {
      console.error(`no found ${subscriptionId} in subscribedMap`)
    }
  }

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (channel) {
        console.log(`channel ${channel} will be subscribed`)
        const subscriptionId = subscribe(channel, callback)
        const newSubscribedMap = new Map(subscribedMap)
        newSubscribedMap.set(subscriptionId, {channel: channel})
        setSubscribedMap(newSubscribedMap)
      } else {
        console.log('channel is empty. no subscribe')
      }
    } catch(error) {
      console.error('failed to subscribe:', error)
    }
  }

  const handleUnsubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if(subscriptionId) {
        console.log(`subscriptionId ${subscriptionId} will be unsubscribed`)
        unsubscribe(subscriptionId)
        const newSubscribedMap = new Map(subscribedMap)
        newSubscribedMap.delete(subscriptionId)
        setSubscribedMap(newSubscribedMap)
      } else {
        console.log('subscriptionId is empty. no unsubscribe')
      }
    } catch(error) {
      console.error('failed to unsubscribe:', error)
    }
  }

  const handleChannelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setChannel(value)
  }

  const handleSubscriptionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSubscriptionId(value)
  }

  const mapEntries = Array.from(subscribedMap.entries());

  return (
    <div>
      <div className="text-red-600 font-semibold">Websocket demo:</div>
      <div>
        <div><span className="font-semibold">isConnected:</span><span>{isConnected.toString()}</span></div>
        <div><span className="font-semibold">subscriptionCount:</span>{subscriptionCount}</div>
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
      <div className="grid grid-cols-3 gap-3">
        <div className="font-semibold">subscriptionId</div><div className="font-semibold">channel</div><div className="font-semibold">latest message</div>
        {
          mapEntries.map(([key, {channel, fullData}]) => (
            <>
              <div>{key}</div>
              <div>{channel}</div>
              <div>{fullData ? fullData.payload: ''}</div>
            </>
          ))
        }
      </div>
    </div>
  );
}
