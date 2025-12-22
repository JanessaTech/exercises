import { createClient, Client } from 'graphql-ws';
import WebSocket from 'ws'; 

const POOL_LIVE_DATA_SUBSCRIPTION = `
  subscription GetPoolLiveData($poolId: String!) {
    pools(where: { id: $poolId }) @live {
      id
      liquidity
      tick
      token0 { symbol }
      token1 { symbol }
    }
  }
`;

export function createPoolDataSubscription(poolId: string, onDataUpdate: (data: any) => void) {
    const graphWsUrl = 'wss://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
  
    const client = createClient({
      url: graphWsUrl,
      webSocketImpl: WebSocket,
      connectionParams: {},
      retryWait: async function waitForBackoff() {
        await new Promise(resolve => setTimeout(resolve, 1000));
      },
      shouldRetry: () => true,
    });

    (async () => {
      const unsubscribe = await client.subscribe(
        {
          query: POOL_LIVE_DATA_SUBSCRIPTION,
          variables: { poolId },
        },
        {
          next: (data: any) => {
            console.log('[实时数据更新]', new Date().toISOString());
            onDataUpdate(data.data?.pools[0]);
          },
          error: (error) => {
            console.error('[订阅错误]', error);
          },
          complete: () => {
            console.log('[订阅结束]');
          },
        }
      );
  
      return unsubscribe;
    })();
  
    return client; 
  }