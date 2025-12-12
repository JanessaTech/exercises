'use client'

import useHook, { TransferEvent } from "@/hooks/useHook";
import { useEffect, useState } from "react";

const tokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const walletAddress = '0x3A9b127e87295D90Ac0136eBa0aaA39DB185d341'

export default function Home() {
  const [balance, setBalance] = useState('')
  const [transfers, setTransfers] = useState<TransferEvent[]>([])
  
  const {getBalance, getRecentTransfers} = useHook(tokenAddress, walletAddress)
  const format = (address: string) => `${address.slice(0, 10)}...${address.slice(-5)}`

  useEffect(() => {
    (async () => {
      const balance = await getBalance()
      const transfers = await getRecentTransfers()
      setBalance(balance)
      if (transfers) setTransfers(transfers)
    })()
  }, [])

  return (
    <div>
      <div>Balance: {balance}</div>
      <div>
        <div>Recent transfers:</div>
        <div>
          {
            transfers.map((t) => (
              <div className="flex gap-2">
                <div>from: {t.from}</div>
                <div>to: {t.to}</div>
                <div>value: {t.value.toString()}</div>
                <div>blockNumber: {t.blockNumber}</div>
                <div>tx: {t.txHash}</div>
                <div>logIndex: {t.logIndex}</div>
              </div>
            ))
          }
        </div>
        {/* <div className="grid grid-cols-6 gap-1">
            <div>from</div> <div>to</div> <div>value</div> <div>blockNumber</div> <div>txHash</div> <div>logIndex</div>
              {
                transfers.map((transfer) => (
                  <>
                  <div>{format(transfer.from)}</div>
                  <div>{format(transfer.to)}</div>
                  <div>{transfer.value.toString()}</div>
                  <div>{transfer.blockNumber}</div>
                  <div>{format(transfer.txHash)}</div>
                  <div>{transfer.logIndex}</div>
                  </>
                ))
              }
        </div> */}
      </div>
    </div>
  );
}
