'use client'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ABI, contractAddress } from '../../lib/abi'

const WriteContract = () => {
    const { 
        data: hash,
        writeContract,
        isPending,
        error
      } = useWriteContract()
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ 
    hash 
    })

    const setMessage = (newMsg: String) => {
        writeContract({
          address: contractAddress,
          abi: ABI,
          functionName: 'setMessage',
          args:[newMsg]
        })
      }
    return (
        <div>
            <button className='px-2 py-1 bg-zinc-300 rounded-full'
                onClick={() => setMessage('Hello JanessaTech!')} 
                disabled={isPending}
            >
                {isPending ? 'confirming...' : 'click here to set new message'}
            </button>
        
            {hash && <div>Transaction hash: {hash}</div>}
            {isConfirming && <div>Waiting for confrimation...</div>}
            {error && <div>Error: {error.message}</div>}
      </div>
    )
}
export default WriteContract