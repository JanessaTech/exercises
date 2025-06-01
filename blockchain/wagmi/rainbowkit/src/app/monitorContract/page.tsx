'use client'
import { ABI } from '@/lib/abi'
import { useWatchContractEvent } from 'wagmi'

// we will be using contract src/contract/hello.sol
// make sure that you deployed it on hardhat and update the contractAddress defined in lib/abi.ts to the your address
// before you run the codes below

const MonitorContract = () => {
    useWatchContractEvent({
        address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        abi: ABI,
        eventName: 'SendMessage',
        onLogs(logs) {
          console.log('New logs!', logs)
        },
      })
    return (
        <div>Monitoring the events for SendMessage...</div>
    )
}

export default MonitorContract