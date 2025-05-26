import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
import {http } from "wagmi";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  transports: {
    // RPC URL for each chain
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    ),
  },
  ssr: true,
});