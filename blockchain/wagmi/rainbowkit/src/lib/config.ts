import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';
import {http } from "wagmi";
import {
  walletConnectWallet,
  injectedWallet,
  okxWallet,
  uniswapWallet,
  trustWallet
} from '@rainbow-me/rainbowkit/wallets';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: projectId,
  wallets: [{
    groupName: 'Recommended',
    wallets: [walletConnectWallet,injectedWallet,okxWallet,uniswapWallet,trustWallet],
  }],
  chains: [
    mainnet,
    polygon,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  transports: {
    // RPC URL for each chain
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    ),
    [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`),
    [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`),
    [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`),
  },
  ssr: true,
});