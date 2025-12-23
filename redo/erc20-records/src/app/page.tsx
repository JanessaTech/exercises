'use client'

import useERC20Hook, { TransferLogType } from "@/hooks/useERC20Hook"
import { useEffect, useState } from "react"

const tokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const walletAddress = '0x3A9b127e87295D90Ac0136eBa0aaA39DB185d341'

export default function Home() {
  const [balance, setBalance] = useState('')
  const [transfers, setTransfers] = useState<TransferLogType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const {getBalance, getRecentTransfers} = useERC20Hook(tokenAddress, walletAddress)

  const format = (address: string) => `${address.slice(0, 10)}...${address.slice(-5)}`

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const balance = await getBalance()
      const transfers = await getRecentTransfers()
      setBalance(balance)
      setTransfers(transfers)
      setIsLoading(false)
    })()
  }, [])

  return (
    <div>
      {
        isLoading 
        ? <div>Loading...</div>
        : 
        <>
        <div>Balance: {balance}</div>
        <div className="grid grid-cols-6 gap-3">
          <div>from</div> <div>to</div> <div>value</div> <div>blockNumber</div> <div>txHash</div> <div>logIndex</div>
          {transfers.map((transfer) => (
            <>
              <div>{format(transfer.from)}</div>
              <div>{format(transfer.to)}</div>
              <div>{transfer.value}</div>
              <div>{transfer.blockNumber}</div>
              <div>{format(transfer.txHash)}</div>
              <div>{transfer.logIndex}</div>
            </>
          ))}
        </div>
        </>
      }
      
    </div>
  )
}
