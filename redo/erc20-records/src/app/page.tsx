'use client'

import useERC20Hook, { TransferLogType } from "@/hooks/useERC20Hook"
import { useEffect, useState } from "react"
import { isNullOrUndefined } from "util"

const tokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const walletAddress = '0x3A9b127e87295D90Ac0136eBa0aaA39DB185d341'

export default function Home() {

  const {getBalance, getRecentTransfers} = useERC20Hook(tokenAddress, walletAddress)

  const [balance, setBlance] = useState('')
  const [transfers, setTransfers] = useState<TransferLogType[]>([])
  const [loading, setLoading] = useState(false)

  const format = (address: string) => `${address.slice(0,5)}...${address.slice(-5)}`

  useEffect(() => {
    (async () => {
      setLoading(true)
      const balance = await getBalance()
      const recentTransfer = await getRecentTransfers()
      setBlance(balance)
      setTransfers(recentTransfer)
      setLoading(false)
    })()
  }, [])
  return (
    <div>
      {
        loading 
        ? <div>Loading</div>
        : 
        <>
          <div>Balance: {balance}</div>
          <div className="grid grid-cols-6 gap-5">
            <div>from</div> <div>to</div>  <div>value</div>  <div>blockNumber</div>  <div>transactionHash</div>  <div>logIndex</div>
            {
              transfers.map((transfer) => (
                <>
                <div>{format(transfer.from)}</div>
                <div>{format(transfer.to)}</div>
                <div>{transfer.value}</div>
                <div>{transfer.blockNumber}</div>
                <div>{format(transfer.transactionHash)}</div>
                <div>{transfer.logIndex}</div>
                </>
              ))
            }
          </div>
        </>
      }
    </div>
  )
}
