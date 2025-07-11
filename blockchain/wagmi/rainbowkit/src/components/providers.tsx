'use client';

import type React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { 
    RainbowKitProvider, 
    darkTheme} from '@rainbow-me/rainbowkit';
import { config } from '../lib/config';

import AuthenticationProvider from './AuthenticationProvider';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <RainbowKitProvider 
              theme={darkTheme()} 
              modalSize="compact">
                  {children}  
            </RainbowKitProvider>
        </AuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}