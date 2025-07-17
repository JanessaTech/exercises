'use client';

import type React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { 
    RainbowKitProvider, 
    darkTheme,
    RainbowKitAuthenticationProvider,
    AuthenticationStatus} from '@rainbow-me/rainbowkit';
import { config } from '../lib/config';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createAuthenticationAdapter } from '@rainbow-me/rainbowkit';
import { createSiweMessage } from 'viem/siwe';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  //const {connected, setState, isDone} = useAuthState()
  const fetchingStatusRef = useRef(false);
  const verifyingRef = useRef(false);
  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>('loading');

  useEffect(() => {
    const fetchStatus = async () => {
      if (fetchingStatusRef.current || verifyingRef.current) {
        return;
      }

      fetchingStatusRef.current = true;

      try {
        // const response = await fetch('/api/me');
        // const json = await response.json();
        // setAuthStatus(json.address ? 'authenticated' : 'unauthenticated');
        setAuthStatus('authenticated')
      } catch (_error) {
        setAuthStatus('unauthenticated');
      } finally {
        fetchingStatusRef.current = false;
      }
    };

    // 1. page loads
    fetchStatus();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', fetchStatus);
    return () => window.removeEventListener('focus', fetchStatus);
  }, []);


  const authAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        console.log('getNonce .................')
        const response = await fetch('/api/nonce');
        return await response.text();
      },

      createMessage: ({ nonce, address, chainId }) => {
        console.log('createMessage .................')
        return createSiweMessage({
          domain: window.location.host,
          address,
          statement: 'Sign in with Ethereum to the app.',
          uri: window.location.origin,
          version: '1',
          chainId,
          nonce,
        });
      },

      verify: async ({ message, signature }) => {
        console.log('verify .................')
        verifyingRef.current = true;
        try {
          const response = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, signature }),
          });

          const authenticated = Boolean(response.ok);

          if(authenticated) {
            //setState('authenticated')
            setAuthStatus(authenticated ? 'authenticated' : 'unauthenticated');
            // setAuthStatus('authenticated')
            // console.log('setState(authenticated)')
          }

          return authenticated;
        } catch (error) {
          console.error('Error verifying signature', error);
          return false;
        } finally {
          verifyingRef.current = false;
        }
      },

      signOut: async () => {
        await fetch('/api/logout');
        //setState('unauthenticated')
        setAuthStatus('unauthenticated')
      },
    });
  }, []);

  // console.log('isDone:', isDone)
  // console.log('connected:', connected)
  console.log('authStatus=', authStatus)
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <RainbowKitAuthenticationProvider
          adapter={authAdapter}
          status={'authenticated'}
        >
          <RainbowKitProvider 
            theme={darkTheme()} 
            modalSize="compact">
                {children}  
          </RainbowKitProvider>
          </RainbowKitAuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}