'use client'
import { abi } from '@/lib/erc20Abi'
import { useWatchContractEvent } from 'wagmi'



const MonitorContract = () => {
    useWatchContractEvent({
        address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        abi: abi,
        eventName: 'Transfer',
        onLogs(logs) {
          console.log('New logs!', logs)
        },
      })
    return (
        <div>Monitoring the events for transfer...</div>
    )
}

export default MonitorContract