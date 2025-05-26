import { SendTransaction } from '@/components/send-transanction'
import { useEthersProvider, useEthersSigner } from '@/utils/ethers'
import { Network } from 'ethers'
import { useEffect, useState } from 'react'
import { useAccount, useChainId, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

/*
export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
  const chainid = useChainId()

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <div>chainid:{chainid}</div>
      <button onClick={() => disconnect()}>Disconnect</button>
      <SendTransaction address={address} />
    </div>
  )
}*/

export function Account() {
  const provider = useEthersProvider()
  const signer = useEthersSigner()
  const { disconnect } = useDisconnect()
  const [address, setAddress] = useState<string|undefined>()
  const [network, setNetwork] = useState<Network>()

  useEffect(() => {
    (async () => {
      const _network = await provider?.getNetwork()
      const _address = await signer?.getAddress()
      setNetwork(_network)
      setAddress(_address)
    })()
  })
  return (
    <div>
      <div>Address: {address}</div>
      <div>Network: {network?.name}</div>
      <div>chainId: {network?.chainId?.toString()}</div>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}