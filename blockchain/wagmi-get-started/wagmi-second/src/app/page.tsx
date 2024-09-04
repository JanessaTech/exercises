'use client'

import { WalletOptions } from "@/components/WalletOptions";
import { Account } from "@/components/account";
import { useAccount } from "wagmi";


export default function Home() {
  function ConnectWallet() {
    const { isConnected } = useAccount()
    if (isConnected) return <Account />
    return <WalletOptions />
  }

  return (
    <ConnectWallet />
  );
}
