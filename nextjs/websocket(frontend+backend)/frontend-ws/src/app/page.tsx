'use client'

import { useState } from "react";
import { WebSocketConfig, WebSocketMessage } from "./hooks/WebSocketClient";
import useWebSocket from "./hooks/useWebSocket";

export default function Home() {
  const config: WebSocketConfig = {
      url: 'ws://localhost:3100', 
      maxReconnectAttempts: 5, 
      reconnectInterval: 2}

  const {connect, disconnect, subscribe, unsubscribe, getSubscriptions, 
        isConnected, subscriptionCount} = useWebSocket(config)
  const [channel, setChannel] = useState('')
  const [subscriptionId, setSubscriptionId] = useState('')
  const [latestMessageMap, setLatestMessageMap] = useState<Map<string, WebSocketMessage>>()

  const callback = (fullData: WebSocketMessage) => {
    console.log('Received fulldata:', fullData)
    console.log('latestMessageMap = ', latestMessageMap)
    setLatestMessageMap(prevMap => {
      const newMap = new Map(prevMap);
      if (fullData?.subscriptionId) {
        newMap.set(fullData.subscriptionId, fullData);
      }
      return newMap
    })
  }

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (channel) {
        console.log(`channel ${channel} will be subscribed`)
        const subscriptionId = subscribe(channel, callback)
        console.log(`The new subscription id: ${subscriptionId}`)
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

  const handleDisconnect = () => {
    setLatestMessageMap(undefined)
    disconnect()
  }

  const mapEntries = Array.from(getSubscriptions().entries());

  return (
    <div>
      <div className="text-red-600 font-semibold">Websocket demo:</div>
      <div>
        <div>
          <span className="font-semibold">isConnected:</span><span>{isConnected.toString()}</span>
          <button onClick={isConnected ? () => handleDisconnect() : () => connect()}
            className="px-2 py-1 rounded-full bg-zinc-300 ml-3 font-semibold hover:bg-zinc-400 active:bg-zinc-500">
              {isConnected ? 'disconnect' : 'connect'}
          </button>
        </div>
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
          mapEntries.map(([subscriptionId, subscription], index) => {
            const data = latestMessageMap?.get(subscriptionId)
            return (
              <>
                <div key={`${index}-0`}>{subscriptionId}</div>
                <div key={`${index}-1`}>{subscription.channel}</div>
                <div key={`${index}-2`}>{data ? JSON.stringify(data, null, 2) : ''}</div>
              </>)
          })
        }
      </div>
    </div>
  );
}
