'use client'

import useHook, { TransferEvent } from "@/hooks/useHook";
import { useEffect, useState } from "react";

const tokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const walletAddress = '0x3A9b127e87295D90Ac0136eBa0aaA39DB185d341'

export default function Home() {
  const [balance, setBalance] = useState('')
  const [transfers, setTransfers] = useState<TransferEvent[]>([])
  
  const {getBalance, getRecentTransfers} = useHook(tokenAddress, walletAddress)
  

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
                <div>tx: {t.transactionHash}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
