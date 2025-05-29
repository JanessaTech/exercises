'use client'

import { parseEther } from "viem"
import { useSendTransaction } from "wagmi"

// it shows how to send transaction
const SendTx = () => {
    const { data:hash, isPending, isSuccess, sendTransaction } = useSendTransaction()

    const handleSendTx = () => {
        sendTransaction({
            to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            value: parseEther('10')
        })
    }
    return (
        <div>
            <button onClick={handleSendTx} disabled={isPending} className="bg-zinc-400 rounded-full">{isPending ? 'Sending...' : 'Send 10 ETH'}</button>
            {isSuccess && (
            <div>Transaction hash: {hash}</div>
            )}
        </div>
    )
}

export default SendTx